<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Play from "@/components/Music/Play.vue";
import MusicList from "@/components/MusicForGet/MusicList.vue";
import { ref } from "vue";
const isMusicListLoaded = ref(false);
setTimeout(() => {
  isMusicListLoaded.value = true;
}, 500); // 模拟初始化完成的时间，实际情况根据需求调整
</script>

<template>
  <MusicList />
  <RouterView v-if="isMusicListLoaded" />
  <!-- <Play /> -->
</template>

<style scoped></style>
