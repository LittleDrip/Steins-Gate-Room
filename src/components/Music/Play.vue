<script lang="ts" setup>
import LeftIcon from "@/assets/img/play/LeftIcon.png";
import RightIcon from "@/assets/img/play/RightIcon.png";
import MidIcon from '@/assets/img/play/MidIcon.png';
import FakeBg from "@/assets/img/bg/a.png";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import { useStatusInfo } from '@/stores/StatusInfo';
const musicStore = useMusicInfoStore();
const StatusInfo = useStatusInfo();
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
  url: musicStore.ListInfo[currentSongIndex.value].url,
  time: musicStore.ListInfo[currentSongIndex.value].time,
}));

watch(currentSongIndex, () => {
  StatusInfo.setSongIndex(currentSongIndex.value);
}, { immediate: true })
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
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.ListInfo.length; // 循环播放
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    // console.log(currentInfo.value);
    audio.play();
  } else {
    isPlaying.value = true;
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.ListInfo.length; // 循环播放
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
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
      (currentSongIndex.value - 1 + musicStore.ListInfo.length) % musicStore.ListInfo.length;
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);

    audio.play();
  } else {
    isPlaying.value = true;

    currentSongIndex.value =
      (currentSongIndex.value - 1 + musicStore.ListInfo.length) % musicStore.ListInfo.length;
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);

    audio.play();
    emits("FatherClick");
  }
};

const showPre = ref(false);
const showPre1 = ref(false);
const showPre2 = ref(false);
watch(
  () => musicStore.ListInfo, // 监听 musicStore.ListInfo 的变化
  (newList) => {
    if (newList.length > 0) { // 确保列表不为空
      // 现在可以安全地访问 ListInfo 的 URL
      audio = new Audio(musicStore.ListInfo[currentSongIndex.value].url);
      audio.addEventListener("ended", playNextSong);
    }
  },
  { immediate: true } // 立即执行一次，确保首次加载时也能够监听
);


onMounted(() => {
  musicStore.setCurrentInfo(currentInfo.value);
  // console.log(currentInfo.value);
  console.log(musicStore.ListInfo[currentSongIndex.value].url);
  audio = new Audio(musicStore.ListInfo[currentSongIndex.value].url);
  audio.addEventListener("ended", playNextSong); // 监听音频结束事件
});

onUnmounted(() => {
  audio.pause();
  audio.removeEventListener("ended", playNextSong); // 移除监听器
  audio = null;
});
</script>

<template>




  <div class="play" style="text-align: center">
    <transition name="fade">
      <div v-if="showPre == true" class="pre">上一首</div>
    </transition>
    <el-image @dragstart.prevent class="fakeBg" :src="FakeBg" alt="" />
    <img @dragstart.prevent @click="playPreviousSong" :src="LeftIcon" alt="" @mouseover="showPre = true"
      @mouseleave="showPre = false" />
    <transition name="fade">
      <div v-if="showPre1 == true" class="playing">播放</div>
    </transition>
    <el-image @dragstart.prevent class="fakeBg2" :src="FakeBg" alt="" />

    <img @dragstart.prevent :src="MidIcon" alt="" @click="handleClick" style="width: 7em;margin-top: -0.6em;"
      @mouseover="showPre1 = true" @mouseleave="showPre1 = false" />
    <transition name="fade">
      <div v-if="showPre2 == true" class="next">下一首</div>
    </transition>
    <el-image @dragstart.prevent class="fakeBg3" :src="FakeBg" alt="" />

    <img @dragstart.prevent @click="playNextSong" :src="RightIcon" alt="" @mouseover="showPre2 = true"
      @mouseleave="showPre2 = false" />
  </div>

</template>

<style scoped>
.fakeBg {
  width: 5.4em;
  height: 4.2em;
  position: absolute;
  border-radius: 1em;
  margin-left: -14em;
  margin-top: 0.5em;
  background-color: rgba(255, 255, 255, 0.5);
  /* background-color: rgba(240, 211, 211, 0.5); */
  z-index: -1;
}

.fakeBg2 {
  width: 5.4em;
  height: 4.2em;
  position: absolute;
  border-radius: 1em;
  margin-left: -1.1em;
  margin-top: 0.5em;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-color: rgba(240, 211, 211, 0.5);
  z-index: -1;
}

.fakeBg3 {
  width: 5.4em;
  height: 4.2em;
  position: absolute;
  border-radius: 1em;
  margin-left: 12em;
  margin-top: 0.5em;
  background-color: rgba(255, 255, 255, 0.5);
  /* background-color: rgba(240, 211, 211, 0.5); */
  z-index: -1;
}

.play {
  position: relative;
  margin-left: 1em;
  margin-top: 20em;
  display: flex;
  justify-content: center;
}

.play img {
  cursor: pointer;
  width: 3.8em;
  height: 100%;
  margin-right: 1.0em;
  /* margin-left: 2em; */
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
  margin-top: -2.5em;
  margin-left: -14em;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #0e1112;
  /* transform: translateY(-50%); */
}

.playing {
  position: absolute;
  padding: 5px 10px;
  color: #ffffff;
  margin-top: -2em;
  margin-left: -2em;
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
  margin-top: -2em;
  margin-left: 12em;
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
