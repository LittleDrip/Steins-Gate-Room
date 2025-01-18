<script lang="ts" setup>
import sendImg from '@/assets/img/play/Mid2.png';
import { useChatUsersStore } from '@/stores/ChatUsers';
import { useMessageStore } from '@/stores/MessageStore';
import { useCurrentMessageStore } from "@/stores/CurrentMessageStore";
import { useStatusInfo } from '@/stores/StatusInfo';
import { ElMessage } from 'element-plus';
import { useMusicInfoStore } from '@/stores/MusicInfo';

const musicStore = useMusicInfoStore();
const statusStore = useStatusInfo();
const CurrentMessageStore = useCurrentMessageStore();
const MessageStore = useMessageStore();
const chatUsersStore = useChatUsersStore();
import router from "@/router";
import { onActivated, onDeactivated, onUnmounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
const route = useRoute();

let nickname = ref();
let avatarId = ref<string | null>("");
let socket: WebSocket;
let heartbeatInterval: number; // 心跳定时器ID
let heartbeatTimeout: number; // 心跳超时定时器ID
const heartbeatTime = 30000; // 心跳间隔时间（30秒）
const startHeartbeat = () => {
    // 清除上一个定时器（如果有）
    clearInterval(heartbeatInterval);
    clearTimeout(heartbeatTimeout);

    // 定时发送心跳
    heartbeatInterval = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'heartbeat', msg: 'ping' }));
        }

    }, heartbeatTime);
};

const stopHeartbeat = () => {
    clearInterval(heartbeatInterval);
    clearTimeout(heartbeatTimeout);
};
// 用户数量
let userCount = ref(0);

// 用户列表
let userList = ref([]);

// 信息框
let text = ref("");

// 信息列表
let messages = ref([]);

const message = {
    avatar: "",
    name: "",
    time: "",
    msg: "",
}
const portalMsges = ref([]);
let room = ref();

watch(() => route.query.id, (newValue) => {
    room.value = newValue;
}, { immediate: true })

const lastExecuted = ref(0);
const messageCount = ref(0);
const isBlocked = ref(false); // 标志位，指示是否处于禁止状态
const debounceTime = 5000; // 5秒
const throttleTime = 10000; // 10秒


const sendMessage = () => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastExecuted.value;

    if (isBlocked.value) {
        ElMessage({
            type: 'error',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 发送频繁，请稍后再试~',
        });
        return;
    }

    if (timeElapsed < debounceTime) {
        messageCount.value += 1;
    } else {
        messageCount.value = 1; // Reset count
    }

    lastExecuted.value = currentTime;

    if (messageCount.value > 5) {
        // 超过限制次数，禁用操作并弹窗
        isBlocked.value = true;
        setTimeout(() => {
            isBlocked.value = false; // 解锁状态
        }, throttleTime); // 禁用时间
        ElMessage({
            type: 'error',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 发送频繁，请稍后~',
        });
        return;
    }

    if (text.value != null && text.value.trim() !== "" && nickname.value != null) {
        message.name = nickname.value;
        message.time = formatTime(new Date());
        message.avatar = localStorage.getItem("avatarId") || '0';
        message.msg = text.value;
        socket.send(JSON.stringify(message));
        message.msg = "";
        text.value = "";
    }
}
onActivated(() => {
    // console.log(room.value);
    nickname.value = localStorage.getItem("nickName")
    avatarId.value = localStorage.getItem("avatarId");
    if (nickname.value == null && avatarId.value == null) {
        router.push("/hall");
        return;
    }

    // 查询浏览器是否支持 WebSocket
    if (typeof WebSocket == "undefined") {
        alert("您的浏览器不支持 WebSocket");
        router.push("/");
        return;
    }
    // 开启 WebSocket 服务
    let socketHost = "localhost";
    let socketPort = "9090";
    let socketUrl =
        "ws://" + socketHost + ":" + socketPort + "/socket/" + room.value + '/' + nickname.value + '/' + avatarId.value;
    socket = new WebSocket(socketUrl);
    // 将socket实例暴露给window对象,以便其他组件可以访问
    (window as any).chatSocket = socket;

    // 连接服务器
    socket.onopen = () => {
        startHeartbeat(); // 启动心跳
    };

    // 浏览器接收服务端发送的消息
    socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        if (data.type === 'heartbeat' && data.msg === 'pong') {
            clearTimeout(heartbeatTimeout); // 收到服务端回应后清除超时检测
        }
        else if (data.userlist) {
            // 接收用户列表消息
            userList.value = data.userlist;
            userCount.value = data.userlist.length;
            chatUsersStore.setUserList(userList.value);
            chatUsersStore.setUserCount(userCount.value);
        } else if (data.type === 'portalMsg') {
            // 接收音乐信息
            portalMsges.value.push(data);
        } else if (data.type === 'kick' && data.kickedUser === nickname.value) {
            // 被踢出房间
            ElMessage({
                type: 'warning',
                customClass: 'msgInfo',
                plain: true,
                message: '你已被房主踢出房间'
            });
            router.push('/hall');
        } else if (data.type === 'requestSong') {
            // 处理点歌消息
            const songInfo = data.song;
            // 如果不是自己点的歌，就添加到点歌列表
            if (data.requester !== nickname.value) {
                musicStore.addSongToRequestList(songInfo);
            }
        } else {
            // 接收消息
            messages.value.push(data);
            CurrentMessageStore.setCurrentMessage(room.value, data.name, data.msg)
            MessageStore.addMessage(room.value, data);
        }
    };
    // 关闭服务
    socket.onclose = () => {
        // console.log("WebSocket 服务已关闭");
        stopHeartbeat();
    };
    // 错误事件
    socket.onerror = () => {
        console.log("WebSocket 服务发生错误");
        stopHeartbeat();
    };
})

// 在组件卸载前关闭 WebSocket 连接
onDeactivated(() => {
    if (socket) {
        // console.log("离开");

        socket.close();
    }
    stopHeartbeat(); // 停止心跳

})
// 在路由离开前关闭 WebSocket 连接
onBeforeRouteLeave((to, from, next) => {
    if (socket) {
        // console.log("离开");
        socket.close();
    }
    stopHeartbeat(); // 停止心跳

    next();
})
// 日期转换
const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
        [year, month, day].map(formatNumber).join("-") +
        " " +
        [hour, minute, second].map(formatNumber).join(":")
    );
};
const formatNumber = (n: number) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
};
// 监听 portalMsges 的变化
watch(portalMsges, () => {
    const container = document.querySelector('.portalMsgesContainer') as HTMLElement;
    if (container && container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
    }
}, { deep: true });

// 添加点歌列表显示状态
const showRequestList = ref(false);
</script>

<template>
    <!-- 点歌列表展示 -->
    <div class="request-list-container" @click="showRequestList = !showRequestList">
        <div class="request-list-trigger">
            点歌列表 ({{ musicStore.RequestList.length }})
        </div>
        <transition name="slide-down">
            <div v-if="showRequestList" class="request-list" @click.stop>
                <div v-if="musicStore.RequestList.length > 0">
                    <div v-for="(song, index) in musicStore.RequestList" :key="index" class="request-song">
                        <div class="song-info">
                            <img :src="song.picUrl" class="song-cover">
                            <div class="song-details">
                                <div class="song-name">{{ song.name }}</div>
                                <div class="song-author">{{ song.author }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="empty-list">
                    暂无点歌，请前往添加歌曲点歌
                </div>
            </div>
        </transition>
    </div>

    <!-- 原有的消息展示 -->
    <div class="portalMsgesContainer">
        <div class="portalMsges" v-for="message in portalMsges" :key="message">
            {{ message.msg }}
        </div>
    </div>
    <div class="footerDiv">
        <div class="footerBar">
            <div class="chatBar">
                <input v-model="text" @keyup="handleKeyUp" class="input-style" type="text">
            </div>
            <div class="imgBtn">
                <img class="sendImg" :src="sendImg" @click="sendMessage">
            </div>
        </div>
    </div>
</template>

<style scoped>
.portalMsgesContainer {
    max-height: 16em;
    /* 定义最大高度 */
    overflow-y: auto;
    /* 超出内容自动滚动 */
    line-height: 1.45em;
    overflow: hidden;
}

.portalMsges {
    font-size: .95em;
    position: relative;
    color: #f2f3f2;
}

.footerDiv {
    position: relative;
    width: 100%;
    bottom: 0;
}

.footerBar {
    display: grid;
    height: 3.8em;
    /* background-color: beige; */
    grid-template-columns: 1fr 52vw 1fr;
    grid-template-areas: 'l c r';
    justify-items: center;
    background-color: rgba(68, 68, 68, .48);
}

.chatBar {
    grid-area: c;
    width: 100%;
    justify-items: center;
}

.imgBtn {
    grid-area: r;
    padding: .4em .4em;
    width: 100%;

}

.sendImg {
    cursor: pointer;
    width: 2.8em;
    transform: translateX(-4em);
}

.sendImg:hover {
    transform: translateX(-4em) scale(1.1);
}

.input-style {
    margin-top: .3em;
    padding: .4em .4em;
    height: inherit;
    width: 100%;
    border: 2px solid #ccc;
    border-radius: .3em;
    font-size: 1.4em;
    color: #555;
    outline: none;
}

.request-list-container {
    position: fixed;
    top: 1em;
    right: 1em;
    z-index: 1000;
}

.request-list-trigger {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.request-list-trigger:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.request-list {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5em;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    padding: 1em;
}

.request-song {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.request-song:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.song-info {
    display: flex;
    align-items: center;
}

.song-cover {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 1em;
}

.song-details {
    flex: 1;
}

.song-name {
    color: white;
    font-size: 1em;
    margin-bottom: 0.3em;
}

.song-author {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9em;
}

.empty-list {
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    padding: 1em;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>