<script lang="ts" setup>
import { useMessageStore } from '@/stores/MessageStore';
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getAvatarUrlById } from '@/utils/avatarUtils';

const MessageStore = useMessageStore();
const route = useRoute();
const currentRoomId = computed(() => route.query.id); // 从路由获取当前房间 ID
const currentMessages = computed(() => {
    return MessageStore.getMessages(currentRoomId.value);
});
const initialMessageCount = 11; // 初始显示的消息数量
const messageCount = ref(initialMessageCount); // 当前显示的消息数量
const visibleMessages = computed(() => {
    const messages = currentMessages.value;
    return messages.slice(Math.max(messages.length - messageCount.value, 0));
});
const loadMoreMessages = () => {
    messageCount.value += initialMessageCount; // 每次加载更多增加11条消息
};
let nickName = localStorage.getItem("nickName")
</script>

<template>
    <div>
        <div class="message-container">
            <a style="cursor: pointer;color: cornflowerblue;" v-if="currentMessages.length > messageCount"
                @click="loadMoreMessages">
                查看更多
            </a>
            <div class="user-message" v-for="(message, index) in visibleMessages" :key="index">
                <div class="img">
                    <img class="user-img" loading="lazy" :src="getAvatarUrlById(message.avatar)" alt="">
                </div>
                <div class="message">
                    <div :class="{ greenNickName: nickName === message.name }" class="username">
                        {{ message.name }}
                    </div>
                    <div class="text user-text" v-if="nickName === message.name">
                        {{ message.msg }}
                    </div>
                    <div class="text" v-if="nickName !== message.name">
                        {{ message.msg }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.message-container {
    width: 23em;
    /* margin-left: -1em; */
    /* padding: .8em; */
    overflow-y: auto;
    height: 100%;
}

.user-message {
    display: flex;
    padding: .5em;
    padding-left: 0;
    border-bottom: 1px solid #ddd;
}

.message {
    position: relative;
    padding-left: 1em;
}

.username {
    font-size: .9em;
    padding-bottom: .1em;
    color: #6a6f6e;
}

.text::before {
    content: '';
    position: absolute;
    left: .6em;
    /* Adjust position as needed */
    top: 1.7em;
    /* Adjust position as needed */
    width: 0;
    height: 0;
    border-top: .5em solid transparent;
    border-bottom: .5em solid transparent;
    border-right: .5em solid #8aa9d4;
    /* Same color as the text bubble */
}

.text {
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    float: left;
    text-align: left;
    color: #fff !important;
    background-color: #8aa9d4;
    padding: .5em 1em;
    border-radius: .3em;
}


.user-img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    border: pink solid 1px;
}

.user-text::before {
    border-top: .5em solid transparent;
    border-bottom: .5em solid transparent;
    border-right: .5em solid #7bb574;
    /* Same color as the text bubble */
}

.user-text {
    color: black;
    background-color: #7bb574
}

.greenNickName {
    color: #7bb574;
}
</style>