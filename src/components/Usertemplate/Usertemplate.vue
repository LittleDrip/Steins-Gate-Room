<script lang="ts" setup>
import { useChatUsersStore } from '@/stores/ChatUsers';
import { getAvatarUrlById } from '@/utils/avatarUtils';
import { useMessageStore } from '@/stores/MessageStore';
import { useCurrentMessageStore } from '@/stores/CurrentMessageStore';
import { watch, watchEffect } from 'vue';
const MessageStore = useMessageStore();
const chatUsersStore = useChatUsersStore();
const CurrentMessageStore = useCurrentMessageStore();
// watchEffect(() => {

//     console.log(CurrentMessageStore.currentMessages);
// })

</script>

<template>

    <div class="UserAvatarList">
        <div class="UserContainer1">
            <div v-for="(user, index) in chatUsersStore.userList.slice(0, 2)" :key="index"
                :class="{ 'AvatarDiv1': index === 1, 'AvatarDiv': index === 0, 'oneuser': chatUsersStore.userCount == 1 }">
                <div class="relativeContent">
                    <transition name="slide-fade">
                        <div v-if="CurrentMessageStore.currentMessages.has(user.username)" class="currentMessage">
                            <p> {{ CurrentMessageStore.currentMessages.get(user.username).msg }}</p>
                        </div>
                    </transition>
                </div>
                <img :src="getAvatarUrlById(user.avatar)" :alt="`User ${user.username}`">
                <div class="avatarBoxNickBig avatarSmall">{{ user.username }} </div>
                <!-- 显示用户的当前消息 -->

            </div>
        </div>
        <div class="UserContainer2">
            <div v-for="(user, index) in chatUsersStore.userList.slice(2, 8)" :key="index" class="AvatarDivBottom">
                <div class="relativeContent">
                    <transition name="slide-fade">
                        <div v-if="CurrentMessageStore.currentMessages.has(user.username)" class="currentMessageBottom">
                            <p> {{ CurrentMessageStore.currentMessages.get(user.username).msg }}</p>
                        </div>
                    </transition>
                </div>
                <img :src="getAvatarUrlById(user.avatar)" :alt="`User ${user.username}`">
                <div class="avatarBoxNick avatarSmall">{{ user.username }} </div>
                <!-- 显示用户的当前消息 -->

            </div>
        </div>
    </div>
</template>

<style scoped>
.UserAvatarList {
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 1;
}

.UserContainer1 {
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 12em 1fr;
    grid-template-rows: 0;
    grid-template-areas: "left mid rigth";
    margin-top: 10em;
}

.UserContainer1 div {
    display: grid;
    justify-content: center;
    align-items: center;
}

.UserContainer2 {
    position: absolute;
    display: flex;
    margin-top: 25em;

}

.UserContainer2 div {
    display: grid;
    justify-content: center;
    align-items: center;
}

.AvatarDiv {
    grid-area: left;
    justify-content: center;
}

.AvatarDiv img {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    /* margin-right: 8em; */
}

.AvatarDiv1 {
    grid-area: right;
    height: 3em;
}

.AvatarDiv1 img {
    width: 6em;
    height: 6em;
    border-radius: 50%;
}



.AvatarDivBottom img {
    width: 5em;
    height: 5em;
    border-radius: 50%;
    margin-right: 1.6em;
    justify-content: center;
    align-items: center;

}

.avatarBoxNickBig {
    margin-top: -.8em;
    /* padding-top: 1em; */
    backdrop-filter: blur(3px);
    width: 100%;
    height: 1.2em;
    color: #dfdbdb;
    font-size: 1.1em;
    background-color: rgba(88, 94, 87, .64);
    /* line-height: 1.1em; */
    border-radius: 3px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.oneuser {
    margin-right: 3em;
}

.avatarBoxNick {

    margin-top: -.8em;
    backdrop-filter: blur(3px);
    /* width: 4.8em; */
    width: 75%;
    height: auto;
    color: #dfdbdb;
    font-size: 0.9em;
    background-color: rgba(88, 94, 87, .64);
    /* line-height: 1.1em; */
    border-radius: 3px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.avatarSmall {
    background-color: rgba(0, 0, 0, .25);
}

.relativeContent {
    position: relative;
    width: auto;
}

.currentMessage {
    position: absolute;
    margin: 0 auto;
    box-sizing: border-box;
    top: -3em;
    left: 0;
    right: 0;


    /* 确保在头像上方 */
}

.currentMessageBottom {
    position: absolute;
    margin: 0 auto;
    box-sizing: border-box;
    top: -3em;
    left: -2em;
    right: 0;

    /* 确保在头像上方 */
}

.currentMessage p {
    width: fit-content;
    background-color: #fff;
    color: #27231e;
    font-size: 1.1em;
    padding: 0.5em;
    border-radius: .4em;
    text-align: center;
    white-space: nowrap;
    z-index: 2;
}

.currentMessageBottom p {
    width: fit-content;
    background-color: #fff;
    color: #27231e;
    font-size: 1.1em;
    padding: 0.5em;
    border-radius: .4em;
    text-align: center;
    white-space: nowrap;
    z-index: 2;
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.2s ease-in-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
