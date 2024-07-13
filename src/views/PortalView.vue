<script lang="ts" setup>
import { ref } from "vue";
import zhenyouli from "@/assets/img/people/zhenyouli.png";
let portalName = ref("破石头门休息室");
</script>

<template>
  <div class="all" style="text-align: center">
    <div class="context" style="display: inline-block; font-size: 60px">
      <p>石</p>
      <p>头</p>
      <p>门</p>
      <p style="font-family: 'ErrorSans'">の</p>
      <p>休息室</p>
    </div>
    <div><img :src="zhenyouli" alt="" width="100px" /></div>
  </div>
</template>

<style scoped>
@import "../assets/text/text.css";
.all {
  font-weight: 550;
  font-family: "MiSans";
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: #d1ac6b;
  z-index: -100;
  /* background: repeating-linear-gradient(25deg, #d1ac6b, #d1ac6b 20px, #d1ac6b 20px, #d1ac6b 40px); */
}
.context {
  margin-top: 80px;
}
p {
  margin-top: 20px;
}
</style>
