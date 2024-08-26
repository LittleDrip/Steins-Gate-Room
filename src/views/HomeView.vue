<script setup lang="ts">
import dish from "@/assets/img/dish1.png";
// const dish = 'https://s21.ax1x.com/2024/08/04/pkjx1AI.png';
import pole from "@/assets/img/pole.png";
import Play from "@/components/Music/Play.vue";
import Aside from '@/components/Aside/aside.vue';
import MusicList from "@/components/MusicForGet/MusicList.vue";
import Usertemplate from '@/components/Usertemplate/Usertemplate.vue';
import BottomChat from '@/components/Bottom/BottomChat.vue';
import { updateRoom, getAssetsFile } from '@/utils/selector';
import { useRoute } from 'vue-router';
import { useMusicInfoStore } from "@/stores/MusicInfo";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useChatUsersStore } from "@/stores/ChatUsers";
const chatUsersStore = useChatUsersStore();

const musicStore = useMusicInfoStore();
const route = useRoute();
let roomName = ref(updateRoom(route.query.id));
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

/**
 * 接受后端参数，判断是否有人播放，然后调用函数
 */
let isPlay = ref(false);
const angle = ref(-16); // 旋转角度，初始为0
const isRotating = ref(false); // 标记是否正在旋转
const FirstClick = ref(true);
const rotateImage = () => {
  if (FirstClick.value) {
    isRotating.value = true;
    angle.value += 15; // 每次点击旋转15度
    isPlay.value = true;
    setTimeout(() => {
      isRotating.value = true;
      FirstClick.value = false;
    }, 10); // 旋转动画结束后，将isRotating设为false
  } else {
    angle.value -= 15; // 每次点击旋转15度
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
      // console.log("isPlay 刚变为 true，执行一些操作");
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
  <MusicList />
  <Aside />
  <Usertemplate />
  <div class="bg">
    <img id="bgImg" :src="getAssetsFile(route.query.id)" />
  </div>
  <!--  -->
  <div class="content" style="max-width: 100vw;">
    <div class="header" style="text-align: center; margin-top: 0.5em">
      <h1 style="color: #4b5969; font-size: 2em; text-align: center;">
        {{ roomName
        }}<span style="
            display: inline-block;
            text-align: center;
            color: #4b5969;
            font-size: .5em;
            transform: translateY(-100%);
          ">{{ chatUsersStore.userCount }}/8</span>
      </h1>
      <h3 class="title2" style="color: #4b5969; font-size: 1.5em; text-align: center;font-weight: 500;">
        {{ musicName }}<span style="color: #6c7f92; font-size: 0.5em"> - </span><span
          style="color: #666; font-size: 0.7em;font-weight: 500;">{{ author }}</span>
      </h3>
    </div>

    <div class="middle">

      <img @dragstart.prevent :src="pole" class="pole" style="width: 8.2em;"
        :style="{ transformOrigin: '50% 0% ', transform: `rotate(${angle}deg)` }" :class="{ rotate: isRotating }" />
      <img loading="lazy" class="avatar" :style="{
        transform: isRotating2 ? `rotate(${rotateAngle}deg)` : `rotate(${rotateAngle}deg)`,
      }" :class="{ rotating: isRotating2 }" :src="picUrl" />

      <img @dragstart.prevent :src="dish" alt="" style="width: 15.5em;margin-top: 3.5em;" />
    </div>
    <div style="margin-top: -6.5em">
      <keep-alive>
        <Play @FatherClick="FatherClick" />
      </keep-alive>

    </div>
    <div style="position: absolute;bottom: 0;width: 100%;">
      <keep-alive>
        <BottomChat />
      </keep-alive>

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
  backdrop-filter: blur(1px);
  background-color: aliceblue;
  width: 100%;
  height: inherit;
  object-fit: cover;

}

#bgImg {
  background: url("../assets/img/bg/littleImg.jpg") no-repeat center center;
  background-size: cover;
}

.content {
  /* font-family: "ErrorSans"; */

  -webkit-user-drag: none;
  -webkit-transition: .2s;
  transition: .2s;

}

.middle {

  position: relative;
  margin-top: 5em;
  /* 父容器样式 */
}

.middle img {

  position: absolute;
  left: 50%;
  -webkit-user-select: none;
  transform: translate(-50%, -50%);
  /* 绝对定位元素样式 */

}

.pole {
  margin-top: -5.2em;
  margin-left: -1.6em;
  z-index: 10;
}

.avatar {
  width: 10em;
  height: 10em;
  margin-left: -5em;
  margin-top: -1.5em;
  border-radius: 50%;
}

.rotate {
  transition: transform 0.5s ease-in-out;
  /* 添加旋转动画效果 */
}

.rotating {
  transition: transform 0.0000000001s ease-in-out;
}


.title2 {
  margin-top: 0.05em;
}
</style>
