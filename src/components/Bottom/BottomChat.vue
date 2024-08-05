<script lang="ts" setup>
import sendImg from '@/assets/img/play/Mid2.png';
import router from "@/router";
import { onActivated, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
const route = useRoute();

let nickname = ref();
let avatarId = ref<string | null>("");
let prevUserList = ref([]);
let socket: WebSocket;

// 用户数量
let userCount = ref(0);

// 用户列表
let userList = ref([]);

// 信息框
let text = ref("");

// 信息列表
let messages = ref([]);

const message = {
    name: "",
    time: "",
    msg: "",
}
const portalMsges = ref([]);
let room = ref();

watch(() => route.query.id, (newValue) => {
    room.value = newValue;
}, { immediate: true })
const sendMessage = () => {
    // if (text.value.trim() !== '') {
    //     console.log('Message sent:', text.value);
    //     text.value = '';
    // }
    if (text.value != null && text.value !== "" && nickname.value != null) {
        message.name = nickname.value;
        message.time = formatTime(new Date());
        message.msg = text.value;
        socket.send(JSON.stringify(message));
        message.msg = "";
        text.value = "";
    }
};


onActivated(() => {
    console.log(room.value);
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
    let socketPort = "8080";
    let socketUrl =
        "ws://" + socketHost + ":" + socketPort + "/socket/" + room.value + '/' + nickname.value + '/' + avatarId.value;

    socket = new WebSocket(socketUrl);
    // 连接服务器
    socket.onopen = () => {
        console.log("已连接至服务器");
    };

    // 浏览器接收服务端发送的消息
    socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        if (data.userlist) {
            // 接收用户列表消息
            userList.value = data.userlist;
            userCount.value = data.userlist.length;
            console.log(userList.value);
        } else if (data.type === 'musicInfo') {
            // 接收音乐信息
            console.log("------------------------");
            console.log(data.data);
            console.log("------------------------");

            // musicInfo.value = data.data;

        } else if (data.type === 'portalMsg') {
            // 接收音乐信息
            portalMsges.value.push(data);


        } else {
            // 接收消息
            messages.value.push(data);

            // // 获取节点
            // let chatHistory = document.getElementsByClassName("chat-message")[0];
            // if (chatHistory.scrollHeight >= chatHistory.clientHeight) {
            //     setTimeout(function () {
            //         //设置滚动条到最底部
            //         chatHistory.scrollTop = chatHistory.scrollHeight;
            //     }, 0);
            // }
        }
    };
    // 关闭服务
    socket.onclose = () => {
        console.log("WebSocket 服务已关闭");
    };
    // 错误事件
    socket.onerror = () => {
        console.log("WebSocket 服务发生错误");
    };
})
// 在组件卸载前关闭 WebSocket 连接
// 在路由离开前关闭 WebSocket 连接
onBeforeRouteLeave((to, from, next) => {
    if (socket) {
        console.log("离开");
        socket.close();
    }
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
</script>

<template>
    <!-- <div v-for="message in messages" :key="message">
        {{ message.name }} <span>{{ message.time }}</span>
        {{ message.msg }}
    </div> -->

    <div v-for="message in portalMsges" :key="message">
        {{ message.msg }}
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