<script lang="ts" setup>
import LeftIcon from "@/assets/img/play/LeftIcon.png";
import RightIcon from "@/assets/img/play/RightIcon.png";
import MidIcon2 from "@/assets/img/play/MidIcon2.png";
import Mid2 from "@/assets/img/play/Mid2.png";
import FakeBg from "@/assets/img/bg/FakeBg.png";
import { useMusicInfoStore } from "@/stores/MusicInfo";
const musicStore = useMusicInfoStore();
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
const isPlaying = ref(false);
const isChangePlaying = ref(false);

const hasEmitted = ref(false);
let audio: any = null;
let currentSongIndex = 0;
const emits = defineEmits(["FatherClick"]);
const handleClick = () => {
  emits("FatherClick");
  console.log(123);
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};
const playNextSong = () => {
  isChangePlaying.value = true;
  isPlaying.value = true;
  currentSongIndex = (currentSongIndex + 1) % musicStore.MusicURL.length; // 循环播放
  audio.src = musicStore.MusicURL[currentSongIndex].url;
  audio.play();
};
const playPreviousSong = () => {
  isChangePlaying.value = true;
  isPlaying.value = true;
  currentSongIndex =
    (currentSongIndex - 1 + musicStore.MusicURL.length) % musicStore.MusicURL.length;
  audio.src = musicStore.MusicURL[currentSongIndex].url;
  audio.play();
};

const showPre = ref(false);

watchEffect(() => {
  if (isChangePlaying.value && !hasEmitted.value) {
    emits("FatherClick");
    hasEmitted.value = true;
  }
  console.log(showPre);
});
onMounted(() => {
  console.log(musicStore.MusicURL[currentSongIndex].url);
  audio = new Audio(musicStore.MusicURL[currentSongIndex].url);
  audio.addEventListener("ended", playNextSong); // 监听音频结束事件
});

onUnmounted(() => {
  audio.pause();
  audio.removeEventListener("ended", playNextSong); // 移除监听器
  audio = null;
});
</script>

<template>
  <img class="fakeBg" :src="FakeBg" alt="" />
  <img class="fakeBg2" :src="FakeBg" alt="" />

  <div class="play" style="text-align: center">
    <div v-if="showPre == true" class="pre">上一首</div>
    <img
      @click="playPreviousSong"
      :src="LeftIcon"
      alt=""
      @mouseover="showPre = true"
      @mouseleave="showPre = false" />

    <img :src="MidIcon2" alt="" @click="handleClick" style="width: 100px" />

    <img @click="playNextSong" :src="RightIcon" alt="" />
  </div>
</template>

<style scoped>
.fakeBg {
  width: 90px;
  height: 60px;
  position: absolute;
  margin-top: 270px;
  border-radius: 20px;
  margin-left: -55px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

.fakeBg2 {
  width: 90px;
  height: 60px;
  position: absolute;
  margin-top: 270px;
  border-radius: 20px;
  margin-left: -300px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

.play {
  margin-left: -5px;
  display: flex;
  justify-content: center;
}
.play img {
  width: 60px;
  height: 100%;
  margin-right: 20px;

  margin-left: 20px;
  transition: transform 0.05s ease; /* 过渡动画 */
}
.play img:hover {
  transform: scale(1.15); /* 放大比例 */
}
.pre {
  position: absolute; /* 设置为绝对定位 */
  top: 50%;
  left: 50%;
  width: 1231px;
  transform: translate(-50%, -50%); /* 使用 transform 居中 */
  display: none; /* 默认隐藏 */
  background-color: rgba(0, 0, 0, 0.7); /* 设置背景颜色 */
  color: rgb(203, 0, 0); /* 设置文字颜色 */
  padding: 5px 10px; /* 设置内边距 */
  border-radius: 5px; /* 设置圆角 */
}
</style>
