<script lang="ts" setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const emit = defineEmits(['loginSuccess']);
const handleLogin = () => {
    if (nickname.value.trim() === '') {
        isNicknameEmpty.value = true;
        return;
    }
    localStorage.setItem('nickName', nickname.value)
    localStorage.setItem("avatar", selectedAvatar.value)
    isNicknameEmpty.value = false;

    emit('loginSuccess');
};

const avatars = [
    'https://s21.ax1x.com/2024/08/02/pkjeXo8.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjexJg.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjevFS.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjeLeP.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjebLt.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjeOdf.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjezWQ.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjmSzj.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMmAx.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMZH1.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMEu9.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMnN6.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMi3F.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMu4K.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMM9O.jpg',
    'https://s21.ax1x.com/2024/08/02/pkjMlge.jpg',
]

const nickname: any = ref(localStorage.getItem('nickName') != null ? localStorage.getItem('nickName') : '');
const selectedAvatar: any = ref(localStorage.getItem('avatar') != null ? localStorage.getItem('avatar') : avatars[0]);

const isNicknameEmpty = ref(false);


const selectAvatar = (avatar: any) => {
    selectedAvatar.value = avatar;
};
watch(nickname, (newVal) => {
    isNicknameEmpty.value = !newVal;
});
</script>

<template>

    <div class="allLoginBox">
        <div class="loginBox">
            <div class="headPortal">选择角色</div>
            <div class="avatarAndNickName">
                <img :src="selectedAvatar" style="width: 8em; height: 8em; border-radius: 50%;" alt="Selected Avatar" />
                <div :class="{ 'nickName': true, 'border-red': isNicknameEmpty }">
                    <div style="" class="NickNameTitle">
                        <p style="margin-right: 4em;font-size: 1.2em;color: gray;position: absolute;">
                            昵称：</p>
                        <input v-model="nickname" class="nickClass" type="text" placeholder="请输入昵称">
                    </div>
                </div>
            </div>
            <div class="roleAvatar ScrollDiv">
                <div v-for="(avatar, index) in avatars" :key="index" class="item1" @click="selectAvatar(avatar)">
                    <img :src="avatar" :class="{ 'highlighted': avatar === selectedAvatar }" alt="Avatar" />
                </div>
            </div>
            <div class="JoinRoom">
                <button class="comic-button" @click="handleLogin">进入大厅</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.allLoginBox {
    position: relative;
    padding: .2em .6em;
    width: 100%;
    height: 100%;
    -webkit-transition: .2s;
    transition: .2s;

    backdrop-filter: blur(3px);
    z-index: 999;
}

.loginBox {
    margin: 5em auto;
    background-color: #fff;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
    border-radius: 1em;
    /* background: pink; */
    width: 28em;
    height: 38em;
    /* background: antiquewhite; */
    -webkit-transition: .2s;
    transition: .2s;
}

.headPortal {
    padding: 0.2em;
    text-align: center;
    font-size: 1.5em;
}

.avatarAndNickName {
    text-align: center;

}

.nickClass {
    border: none;

    text-align: center;
    /* width: 100%;
    height: 100%; */
    width: 12em;
    font-size: 1.3em;
    font-weight: 700;

}

.nickName {
    border: 2px solid black;
    border-radius: 10px;
    width: 18em;
    margin: 0 auto;
    padding: .2em .6em;
    margin-bottom: .5em;
}

.border-red {
    border-color: red;
    box-shadow: 0 0 3px 1px #ff5f5f;
}

.roleAvatar {
    margin: 0 auto;
    display: grid;
    border-radius: 0.5em;
    width: 90%;
    height: 18em;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    overflow-y: auto;

    background-color: #f2f3f2;
    /* padding: 0.1em; */
}

.roleAvatar div {
    display: block;
    text-align: center;
    padding: 0.5em 0;

}

.item1 img {
    cursor: pointer;
    width: 4.5em;
    height: 4.5em;
    border-radius: 50%;
}

.item1 img:hover {
    transform: scale(1.1);
}

.JoinRoom {
    text-align: center;
    padding: 1em;
}

/* button */
.comic-button {
    display: inline-block;
    padding: 0.5em 5em;

    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: #90c5fa;

    border-radius: 10px;
    box-shadow: 0px 0.3em 0px #000;
    transition: all 0.3s ease;
    cursor: pointer;
}

.comic-button:hover {
    transform: scale(1.1);
}

.comic-button:active {

    box-shadow: none;
    transform: translateY(4px);
}

.ScrollDiv {
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #bac6cc #f2f3f2;
}

.highlighted {
    border: 2px solid pink;
    box-shadow: 0 0 1em pink;
    transform: scale(1.2);
}

/*  -webkit-transition: .2s;
 transition: .2s; */
</style>