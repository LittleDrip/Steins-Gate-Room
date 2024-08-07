<script lang="ts" setup>
import LeftIcon from "@/assets/img/play/LeftIcon.png";
import RightIcon from "@/assets/img/play/RightIcon.png";
import MidIcon from '@/assets/img/play/MidIcon.png';
import FakeBg from "@/assets/img/bg/a.png";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import { useStatusInfo } from '@/stores/StatusInfo';
import { useVolumeStore } from '@/stores/volume';
// ----------------------------
import Lyrics from '@/components/Music/Lyrics.vue';
const currentTime = ref(0);
// ----------------------------

const volumeStore = useVolumeStore();
const musicStore = useMusicInfoStore();
const StatusInfo = useStatusInfo();
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
// import { ElMessage } from "element-plus";
const isPlaying = ref(false);
const isChangePlaying = ref(false);
let audio: any = null;
let currentSongIndex = ref(0);
watch(() => StatusInfo.getSongIndex(), () => {
  const currentSongIndexRef = StatusInfo.getSongIndex();
  currentSongIndex.value = currentSongIndexRef;
  audio.src = musicStore.ListInfo[currentSongIndex.value].url;
  musicStore.setCurrentInfo(currentInfo.value);
  console.log(currentSongIndex.value);
  // ----------------
  if (isPlaying.value == true) {
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    audio.play();
  } else {
    isPlaying.value = true;
    audio.play();
    emits("FatherClick");
  }
  // -----------
})

const emits = defineEmits(["FatherClick"]);
watch(
  () => volumeStore.volume,
  (newVolume) => {
    if (audio) {
      audio.volume = newVolume / 100;
    }
  }
);

let currentInfo = computed(() => ({
  id: musicStore.ListInfo[currentSongIndex.value].id,
  name: musicStore.ListInfo[currentSongIndex.value].name,
  picUrl: musicStore.ListInfo[currentSongIndex.value].picUrl,
  author: musicStore.ListInfo[currentSongIndex.value].author,
  url: musicStore.ListInfo[currentSongIndex.value].url,
  time: musicStore.ListInfo[currentSongIndex.value].time,
}));

const handleClick = () => {
  if (!debounceClick()) {
    ElMessage({
      type: 'info',
      plain: true,
      message: '🍥操作过于频繁，请稍后~',
      customClass: 'msgInfo',
    })
    return;
  }
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
  if (!debounceClick()) {
    ElMessage({
      type: 'info',
      plain: true,
      message: '🍥操作过于频繁，请稍后~',
      customClass: 'msgInfo',
    })
    return;
  }
  if (isPlaying.value == true) {
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.ListInfo.length; // 循环播放
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;

    musicStore.setCurrentInfo(currentInfo.value);
    StatusInfo.setSongIndex(currentSongIndex.value)
    // console.log(currentInfo.value);
    audio.play();
  } else {
    isPlaying.value = true;
    currentSongIndex.value = (currentSongIndex.value + 1) % musicStore.ListInfo.length; // 循环播放
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    StatusInfo.setSongIndex(currentSongIndex.value)

    // console.log(currentInfo.value);
    audio.play();
    emits("FatherClick");
  }
  // isChangePlaying.value = true;
  //
};
const playPreviousSong = () => {
  if (!debounceClick()) {
    ElMessage({
      type: 'info',
      plain: true,
      message: '🍥操作过于频繁，请稍后~',
      customClass: 'msgInfo',
    })
    return;
  }
  if (isPlaying.value == true) {
    currentSongIndex.value =
      (currentSongIndex.value - 1 + musicStore.ListInfo.length) % musicStore.ListInfo.length;
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    StatusInfo.setSongIndex(currentSongIndex.value)

    audio.play();
  } else {
    isPlaying.value = true;
    currentSongIndex.value =
      (currentSongIndex.value - 1 + musicStore.ListInfo.length) % musicStore.ListInfo.length;
    audio.src = musicStore.ListInfo[currentSongIndex.value].url;
    musicStore.setCurrentInfo(currentInfo.value);
    StatusInfo.setSongIndex(currentSongIndex.value)

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
      audio.volume = 0.4;

      audio.addEventListener("ended", playNextSong);
      // ----------------------
      audio.addEventListener("timeupdate", () => {
        currentTime.value = audio.currentTime;
      });
      // ---------------------
    }
  },
  { immediate: true } // 立即执行一次，确保首次加载时也能够监听
);


onMounted(() => {
  // ------------------

  // ------------------
  // musicStore.setCurrentInfo(currentInfo.value);
  // console.log(currentInfo.value);
  // console.log(musicStore.ListInfo[currentSongIndex.value].url);
  // audio = new Audio(musicStore.ListInfo[currentSongIndex.value].url);
  // console.log(audio.volume);
  // console.log(audio);
  audio.addEventListener("ended", playNextSong); // 监听音频结束事件
  // ----------------------
  audio.addEventListener("timeupdate", () => {
    currentTime.value = audio.currentTime;
  });
  // ---------------------
});

onUnmounted(() => {
  audio.pause();
  audio.removeEventListener("ended", playNextSong); // 移除监听器
  audio.removeEventListener("timeupdate", () => {
    currentTime.value = audio.currentTime;
  });
  audio.src = ''; // 清理音频源
  audio = null;
  /* 
  const isPlaying = ref(false);
  const isChangePlaying = ref(false);
   */
  isPlaying.value = false;
  isChangePlaying.value = false;
  StatusInfo.setSongIndex(0);  //将高亮设置为第1个，之后可能会废除

});
const lastClickTime = ref(0);
const clickCount = ref(0);
const clickLimit = 10;
const timeLimit = 5000; // 5 seconds
const isBlocked = ref(false);
const debounceClick = () => {
  if (isBlocked.value) {
    return false;
  }

  const now = Date.now();
  if (now - lastClickTime.value < timeLimit) {
    clickCount.value++;
    if (clickCount.value > clickLimit) {
      isBlocked.value = true;
      setTimeout(() => {
        isBlocked.value = false;
        clickCount.value = 0;
      }, 10000); // 10 seconds
      return false;
    }
  } else {
    clickCount.value = 1;
  }
  lastClickTime.value = now;
  return true;
};
</script>

<template>

  <div :class="{ 'mengban': volumeStore.openLyrics }"></div>

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

    <img @dragstart.prevent :src="MidIcon" alt="" @click="handleClick" style="width: 6em;margin-top: -0.6em;"
      @mouseover="showPre1 = true" @mouseleave="showPre1 = false" />
    <transition name="fade">
      <div v-if="showPre2 == true" class="next">下一首</div>
    </transition>
    <el-image @dragstart.prevent class="fakeBg3" :src="FakeBg" alt="" />

    <img @dragstart.prevent @click="playNextSong" :src="RightIcon" alt="" @mouseover="showPre2 = true"
      @mouseleave="showPre2 = false" />
  </div>
  <!-- 其他代码 -->
  <Lyrics :class="{ 'isOpenLyrics': !volumeStore.openLyrics }" :currentTime="currentTime" style="margin-top: 1em;" />
</template>

<style scoped>
/* 显示歌词的时候开启 */
.isOpenLyrics {
  display: none;
}

.mengban {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.95;
  z-index: -100;
  overflow: hidden;
  backdrop-filter: blur(3px);
  background-color: hsla(0, 0%, 100%, .09);
  z-index: -99;
}

.fakeBg {
  width: 4em;
  height: 3.2em;
  position: absolute;
  border-radius: 1em;
  margin-left: -14em;
  margin-top: 0.5em;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(3px);
  /* background-color: rgba(240, 211, 211, 0.5); */
  z-index: -1;
}

.fakeBg2 {
  width: 5.4em;
  height: 3.8em;
  position: absolute;
  border-radius: 1em;
  margin-left: -1.1em;
  margin-top: 0.5em;
  /* background-color: rgba(255, 255, 255, 0.4); */
  background-color: rgba(240, 211, 211, 0.5);
  z-index: -1;
}

.fakeBg3 {
  width: 4em;
  height: 3.2em;
  position: absolute;
  border-radius: 1em;
  margin-left: 12em;
  margin-top: 0.5em;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.4);
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
  width: 4.5em;
  height: 100%;
  margin-top: 1em;
  margin-right: 1.2em;
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
