<script setup lang="ts">
import Aside from '@/components/Aside/aside.vue';
import { RouterLink, RouterView, useRoute } from "vue-router";
import MusicList from "@/components/MusicForGet/MusicList.vue";
import Test from '@/components/Else/Test.vue';
import Play from '@/components/Music/Play.vue';
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import BottomChat from '@/components/Bottom/BottomChat.vue';
import Usertemplate from '@/components/Usertemplate/Usertemplate.vue';
import PortalUsers from '@/components/Head/PortalUsers.vue';
import { useMessageStore } from '@/stores/MessageStore';
import { useCurrentMessageStore } from '@/stores/CurrentMessageStore';
import router from './router';
const CurrentMessageStore = useCurrentMessageStore();
const MessageStore = useMessageStore();
const route = useRoute();
// 监听路由变化，清空当前消息
// 监听路由变化，清空当前房间的消息
watch(() => route.query.id, (newId, oldId) => {
  if (newId !== oldId) {
    if (oldId) {
      CurrentMessageStore.clearMessagesForRoom(String(oldId)); // 清空旧房间消息
    }
  }
}, { immediate: true });

watch(() => route.query.id, (newRoomId) => {
  if (newRoomId) {
    // 清空当前房间的消息
    MessageStore.clearMessagesForRoom();
  }
});
// onMounted(() => {
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

//   // 检测是否为移动设备
//   const isMobile = /android|webos|iphone|blackberry|iemobile|opera mini/i.test(userAgent);

//   if (isMobile) {
//     router.push('/phone-view');  // 跳转到PhoneView组件对应的路径
//   }
// })
onBeforeMount(() => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 检测是否为移动设备
  const isMobile = /android|webos|iphone|blackberry|iemobile|opera mini/i.test(userAgent);
  // 检测是否为夸克浏览器
  function isQuarkBrowser() {
    const userAgent = navigator.userAgent.toLowerCase()
    return userAgent.includes('quark')
  }
  if (isQuarkBrowser()) {
    router.push('/phone-view');  // 跳转到PhoneView组件对应的路径
  }
})
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
