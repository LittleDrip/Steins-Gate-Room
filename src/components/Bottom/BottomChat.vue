<script lang="ts" setup>
import sendImg from '@/assets/img/play/Mid2.png';
</script>

<template>
    <div class="footerDiv" style="background-image: url('https://lufy.fun/upload/真由理.png');">
        <div class="footerBar">
            <div class="chatBar">
                <input class="input-style" type="text">
            </div>
            <div class="imgBtn">
                <img class="sendImg" :src="sendImg" @click="">
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
    height: 3em;
    background-color: beige;
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
    padding: .3em .4em;
    height: inherit;
    width: 100%;
    border: 2px solid #ccc;
    border-radius: .3em;
    font-size: 1.4em;
    color: #555;
    outline: none;
}
</style>