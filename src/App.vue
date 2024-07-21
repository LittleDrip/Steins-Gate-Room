<script setup lang="ts">
import Aside from '@/components/Aside/aside.vue';
import { RouterLink, RouterView } from "vue-router";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import MusicList from "@/components/MusicForGet/MusicList.vue";
import Test from '@/components/Else/Test.vue';
import Play from '@/components/Music/Play.vue';
import { onMounted, onUnmounted, ref } from "vue";
const musicStore = useMusicInfoStore();
const isMusicListLoaded = ref(false);

const musicListLoaded = ref(false);



// setTimeout(() => {
//   if (musicStore.ListInfo[0].id != "") {
//     isMusicListLoaded.value = true;

//   } else {
//     setTimeout(() => {
//       console.log("加载中");
//       isMusicListLoaded.value = true;
//     }, 0);
//   }
// }, 0); // 模拟初始化完成的时间，实际情况根据需求调整
</script>

<template>

  <div>
    <!-- <MusicList /> -->
    <router-view />

    <!-- <Aside /> -->
    <!-- <Test /> -->
    <!-- <Play /> -->
  </div>
</template>

<style scoped></style>
