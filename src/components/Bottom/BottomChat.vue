<script lang="ts" setup>
import sendImg from '@/assets/img/play/Mid2.png';
import { useChatUsersStore } from '@/stores/ChatUsers';
import { useMessageStore } from '@/stores/MessageStore';
import { useCurrentMessageStore } from "@/stores/CurrentMessageStore";
import { useStatusInfo } from '@/stores/StatusInfo';
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
const heartbeatTime = 5000; // 心跳间隔时间（30秒）
const startHeartbeat = () => {
    // 清除上一个定时器（如果有）
    clearInterval(heartbeatInterval);

    // 定时发送心跳
    heartbeatInterval = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'heartbeat', msg: 'ping' }));
        }

    }, heartbeatTime);
};

const stopHeartbeat = () => {
    clearInterval(heartbeatInterval);
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
    // 连接服务器
    socket.onopen = () => {
        // console.log("已连接至服务器");
        startHeartbeat(); // 启动心跳
    };

    // 浏览器接收服务端发送的消息
    socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        if (data.type === 'heartbeat' && data.msg === 'pong') {
            console.log("Heartbeat response received.");
        }
        else if (data.userlist) {
            // 接收用户列表消息
            userList.value = data.userlist;
            userCount.value = data.userlist.length;
            chatUsersStore.setUserList(userList.value);
            chatUsersStore.setUserCount(userCount.value);
            // console.log(userList.value);
        } else if (data.type === 'portalMsg') {
            // 接收音乐信息
            portalMsges.value.push(data);


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
</script>

<template>
    <!-- <div v-for="message in messages" :key="message">
        {{ message.name }} <span>{{ message.time }}</span>
        {{ message.msg }}
    </div> -->
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
</style>