<script lang="ts" setup>
import LeftIcon from "@/assets/img/play/LeftIcon.png";
import RightIcon from "@/assets/img/play/RightIcon.png";
import MidIcon from "@/assets/img/play/MidIcon2.png";
import MidIcon2 from '@/assets/img/play/MidIcon.png';
import FakeBg from "@/assets/img/bg/a.png";
import { useMusicInfoStore } from "@/stores/MusicInfo";
const musicStore = useMusicInfoStore();
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
const isPlaying = ref(false);
const isChangePlaying = ref(false);
const hasEmitted = ref(false);
let audio: any = null;
let currentSongIndex = ref(0);
const emits = defineEmits(["FatherClick"]);

let currentInfo = computed(() => ({
  name: musicStore.ListInfo[currentSongIndex.value].name,
  picUrl: musicStore.ListInfo[currentSongIndex.value].picUrl,
  author: musicStore.ListInfo[currentSongIndex.value].author,
  url: musicStore.MusicURL[currentSongIndex.value].url,
  time: musicStore.ListInfo[currentSongIndex.value].time,
}));
const handleClick = () => {
  emits("FatherClick");
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
  if (isChangePlaying.value == true) {
    isChangePlaying.value = false;
  }
};
const playNextSong = () => {
  if (isPlaying.value == true) {
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.MusicURL.length; // 循环播放
    audio.src = musicStore.MusicURL[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    // console.log(currentInfo.value);
    audio.play();
  } else {
    isPlaying.value = true;
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.MusicURL.length; // 循环播放
    audio.src = musicStore.MusicURL[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    // console.log(currentInfo.value);
    audio.play();
    emits("FatherClick");
  }
  // isChangePlaying.value = true;
  //
};
const playPreviousSong = () => {
  if (isPlaying.value == true) {
    currentSongIndex.value =
      (currentSongIndex.value - 1 + musicStore.MusicURL.length) % musicStore.MusicURL.length;
    audio.src = musicStore.MusicURL[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);

    audio.play();
  } else {
    isPlaying.value = true;

    currentSongIndex.value =
      (currentSongIndex.value - 1 + musicStore.MusicURL.length) % musicStore.MusicURL.length;
    audio.src = musicStore.MusicURL[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);

    audio.play();
    emits("FatherClick");
  }
};

const showPre = ref(false);
const showPre1 = ref(false);
const showPre2 = ref(false);



onMounted(() => {
  // console.log(musicStore.MusicURL[currentSongIndex].url);
  musicStore.setCurrentInfo(currentInfo.value);
  // console.log(currentInfo.value);
  audio = new Audio(musicStore.MusicURL[currentSongIndex.value].url);
  audio.addEventListener("ended", playNextSong); // 监听音频结束事件
});

onUnmounted(() => {
  audio.pause();
  audio.removeEventListener("ended", playNextSong); // 移除监听器
  audio = null;
});
</script>

<template>
  <transition name="fade">
    <div v-if="showPre == true" class="pre">上一首</div>
  </transition>
  <transition name="fade">
    <div v-if="showPre1 == true" class="playing">播放</div>
  </transition>
  <transition name="fade">
    <div v-if="showPre2 == true" class="next">下一首</div>
  </transition>
  <img @dragstart.prevent class="fakeBg" :src="FakeBg" alt="" style="cursor: pointer" />
  <img @dragstart.prevent class="fakeBg2" :src="FakeBg" alt="" style="cursor: pointer" />
  <img @dragstart.prevent class="fakeBg3" :src="FakeBg" alt="" style="cursor: pointer" />
  <div class="play" style="text-align: center">
    <img @dragstart.prevent @click="playPreviousSong" :src="LeftIcon" alt="" @mouseover="showPre = true"
      @mouseleave="showPre = false" />

    <img @dragstart.prevent :src="MidIcon2" alt="" @click="handleClick" style="width: 100px"
      @mouseover="showPre1 = true" @mouseleave="showPre1 = false" />

    <img @dragstart.prevent @click="playNextSong" :src="RightIcon" alt="" @mouseover="showPre2 = true"
      @mouseleave="showPre2 = false" />
  </div>
</template>

<style scoped>
.fakeBg {
  width: 90px;
  height: 60px;
  position: absolute;
  margin-top: 240px;
  border-radius: 20px;
  margin-left: -55px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

.fakeBg2 {
  width: 90px;
  height: 60px;
  position: absolute;
  margin-top: 240px;
  border-radius: 20px;
  margin-left: -300px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

.fakeBg3 {
  width: 90px;
  height: 60px;
  position: absolute;
  margin-top: 240px;
  border-radius: 20px;
  margin-left: -180px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

.play {
  margin-top: -40px;
  margin-left: -5px;
  display: flex;
  justify-content: center;
}

.play img {
  cursor: pointer;
  width: 60px;
  height: 100%;
  margin-right: 20px;
  margin-left: 20px;
  transition: transform 0.05s ease;
  /* 过渡动画 */
}

.play img:hover {
  transform: scale(1.15);
  /* 放大比例 */
}

.pre {
  position: absolute;
  padding: 5px 10px;
  color: #ffffff;
  top: 290px;
  left: 565px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #0e1112;
  transform: translateY(-50%);
}

.playing {
  position: absolute;
  padding: 5px 10px;
  color: #ffffff;
  top: 290px;
  left: 700px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #0e1112;
  transform: translateY(-50%);
}

.next {
  position: absolute;
  padding: 5px 10px;
  color: #ffffff;
  top: 290px;
  left: 815px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #0e1112;
  transform: translateY(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
