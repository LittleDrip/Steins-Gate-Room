<script setup lang="ts">
import bg from "@/assets/img/bg/Steins4.png";
import dish from "@/assets/img/dish.png";
import pole from "@/assets/img/pole.png";
import Play from "@/components/Music/Play.vue";
import { useMusicInfoStore } from "@/stores/MusicInfo";
const musicStore = useMusicInfoStore();
let roomName = ref("未来道具研究所");
const currentInfo = computed(() => {
  return musicStore.getCurrentInfo();
});
let musicName = computed(() => {
  return currentInfo.value.name;
});
let author = computed(() => {
  return currentInfo.value.author;
});
let picUrl = computed(() => {
  return currentInfo.value.picUrl;
});
let time = computed(() => {
  return currentInfo.value.time;
});
const FatherClick = () => {
  rotateImage();
  toggleRotation();
};
// --------------

// ------------
import { computed, onMounted, ref, watch, watchEffect } from "vue";
/**
 * 接受后端参数，判断是否有人播放，然后调用函数
 */
let isPlay = ref(false);
let picSrc = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png");
const angle = ref(-10); // 旋转角度，初始为0
const isRotating = ref(false); // 标记是否正在旋转
const FirstClick = ref(true);
const rotateImage = () => {
  if (FirstClick.value) {
    isRotating.value = true;
    angle.value += 20; // 每次点击旋转30度
    isPlay.value = true;
    setTimeout(() => {
      isRotating.value = true;
      FirstClick.value = false;
    }, 10); // 旋转动画结束后，将isRotating设为false
  } else {
    angle.value -= 20; // 每次点击旋转30度
    isPlay.value = false;
    setTimeout(() => {
      isRotating.value = true;
      FirstClick.value = true;
    }, 10); // 旋转动画结束后，将isRotating设为false
  }
};
let rotateAngle = ref(0); // 使用 let 来修改变量
let rotationInterval: any;
const isRotating2 = ref(false); // 标记是否正在旋转
const toggleRotation = () => {
  isRotating2.value = !isRotating2.value;
  if (isRotating2.value) {
    rotationInterval = setInterval(() => {
      rotateAngle.value += 0.3;
    }, 30);
  } else {
    clearInterval(rotationInterval);
    rotateAngle.value = rotateAngle.value % 360; // 保证角度在0-360度之间
  }
};
// 深度监听 isPlay 的变化
watch(
  () => isPlay.value,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // newValue 为 true 且 oldValue 为 false
      // 执行你的操作
      console.log("isPlay 刚变为 true，执行一些操作");
    }
  },
  { deep: true, immediate: true } // 开启深度监听并立即执行
);
onMounted(() => {
  if (isPlay.value) {
    rotateImage();
    toggleRotation();
  }
});
</script>

<template>
  <div class="bg">
    <img :src="bg" />
  </div>
  <div class="content">
    <div class="header" style="text-align: center; margin-top: 20px">
      <h1 style="color: #4b5969; font-size: 40px; text-align: center">
        {{ roomName
        }}<span
          style="
            display: inline-block;
            text-align: center;
            color: #4b5969;
            font-size: 15px;
            transform: translateY(-100%);
          "
          >(1/6)</span
        >
      </h1>
      <h3 class="title2" style="color: #4b5969; font-size: 25px; text-align: center">
        {{ musicName }}<span style="color: #6c7f92; font-size: 18px"> - </span
        ><span style="color: #6c7f92; font-size: 18px">{{ author }}</span>
      </h3>
    </div>
    <div class="middle" style="text-align: center; margin-top: 40px">
      <img
        :src="pole"
        class="pole"
        style="width: 140px"
        :style="{ transformOrigin: '50% 0% ', transform: `rotate(${angle}deg)` }"
        :class="{ rotate: isRotating }" />
      <el-avatar
        :size="165"
        class="dish_avatar"
        :style="{
          transform: isRotating2 ? `rotate(${rotateAngle}deg)` : `rotate(${rotateAngle}deg)`,
        }"
        :class="{ rotating: isRotating2 }"
        :src="picUrl" />

      <img :src="dish" alt="" style="width: 260px" />
      <Play style="margin-top: -40px" @FatherClick="FatherClick" />
      <!-- <button
        @click="
          rotateImage();
          toggleRotation();
        ">
        旋转
      </button> -->
    </div>
  </div>
</template>
<style scoped>
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  opacity: 0.95;
  z-index: -100;
}
.bg img {
  width: 100%;
}
.content {
  font-family: "ErrorSans";
}
.pole {
  position: absolute;
  margin-top: -20px;
  margin-left: 130px;
}
.rotate {
  transition: transform 0.5s ease-in-out; /* 添加旋转动画效果 */
}
.rotating {
  transition: transform 0.0000000001s ease-in-out;
}
.dish_avatar {
  position: absolute;
  margin-top: 47px;
  margin-left: 48px;
}
.title2 {
  font-weight: 2;
  margin-top: 7px;
}
</style>
