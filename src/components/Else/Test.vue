<script lang="ts" setup>
// import { getCookie } from '@/utils/login';
import Login from '@/components/Login/login.vue';
import { useCurrentAudioStore } from '@/stores/CurrentAudioStore';
const CurrentAudioStore = useCurrentAudioStore();
import { onMounted, ref } from 'vue';
let audio: any = new Audio();
let time = ref();
CurrentAudioStore.setCurrentAudio(audio)
setInterval(() => {
    // console.log(123);
    // console.log(audio);
    time.value = CurrentAudioStore.getCurrentTime();
    // console.log(time.value);
}, 1000)

setTimeout(() => {
    audio.src = "https://m801.music.126.net/20240808160721/8a54f2722a9ae60028a23b6a817fe59d/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/33989069310/eaf9/4904/cb1a/f89170113df0da695592a9e2adcd2d79.mp3"
    audio.play();

}, 3000)
onMounted(() => {
    audio.src = "https://m701.music.126.net/20240808160103/8f9267313a5ab67519cbd9dcb49fba79/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481676076/cd7a/2bc8/ed0b/ffa9d3058a77f8f78a1759f44fb413b5.mp3"
    audio.play();
})
// let cookie = getCookie();
</script>

<template>
    <div>
        1
    </div>
</template>

<style scoped></style>