<script setup lang="ts">
import Aside from '@/components/Aside/aside.vue';
import { RouterLink, RouterView } from "vue-router";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import MusicList from "@/components/MusicForGet/MusicList.vue";
import { onMounted, onUnmounted, ref } from "vue";
const musicStore = useMusicInfoStore();
const isMusicListLoaded = ref(false);
setTimeout(() => {
  if (musicStore.MusicURL[0].id != "") {
    isMusicListLoaded.value = true;
    // console.log(musicStore.MusicURL[0].id);
  } else {
    setTimeout(() => {
      console.log("加载中");
      isMusicListLoaded.value = true;
    }, 500);
  }
}, 500); // 模拟初始化完成的时间，实际情况根据需求调整
</script>

<template>

  <div>
    <MusicList />
    <router-view v-if="isMusicListLoaded" />
    <!-- <Aside /> -->
  </div>
  <!-- <Link /> -->
</template>

<style scoped></style>
