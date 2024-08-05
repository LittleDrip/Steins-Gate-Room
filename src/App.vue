<script setup lang="ts">
import Aside from '@/components/Aside/aside.vue';
import { RouterLink, RouterView } from "vue-router";
import MusicList from "@/components/MusicForGet/MusicList.vue";
import Test from '@/components/Else/Test.vue';
import Play from '@/components/Music/Play.vue';
import { onMounted, onUnmounted, ref } from "vue";
import BottomChat from '@/components/Bottom/BottomChat.vue';
import Usertemplate from '@/components/Usertemplate/Usertemplate.vue';
import PortalUsers from '@/components/Head/PortalUsers.vue';
</script>

<template>

  <div>
    <router-view />
    <!-- <Aside /> -->
    <!-- <Test /> -->
    <!-- <Play /> -->
    <!-- <BottomChat /> -->
    <!-- <Usertemplate /> -->
    <!-- <PortalUsers /> -->
  </div>
</template>

<style scoped></style>
