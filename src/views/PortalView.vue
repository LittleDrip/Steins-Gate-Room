<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import zhenyouli from "@/assets/img/people/zhenyouli.png";
import zhushou from '@/assets/img/people/zhushou.png';
// import router from "@/router";
import { useRouter } from "vue-router";
import MusicList from "@/components/MusicForGet/MusicList.vue";
const router = useRouter();


const toPre = () => {
  router.push("/hall");
};
</script>

<template>
  <MusicList />
  <div class="all" style="text-align: center">
    <div class="context" style="display: inline-block; font-size: 4em">
      <p>Steins</p>
      <p>Gate</p>
      <p>の</p>
      <p>實驗室</p>
    </div>
    <div style="font-size: 1em; margin-top: .7em">El Psy Kongroo</div>
    <div style="margin-top: 1em"><img :src="zhushou" alt="" /></div>
    <button style="margin-top: 2em;color: #000;" class="button" @click="toPre()">进 入</button>
  </div>



</template>

<style scoped>
@import "../assets/text/text.css";

img {
  width: 6em;
}

.all {
  font-weight: 550;
  /* font-family: "MiSans"; */
  /* font-family: "ErrorSans"; */
  font-family: "EvaSans";
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: #d1ac6b;
  z-index: -100;
}

.context {
  margin-top: 1em;
}

p {
  margin-top: .3em;
}

.button {
  width: 11em;
  height: 3em;
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 22px;
  color: white;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 34px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}

.button::before {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgba(255, 248, 220, 0.585);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.button:hover::before {
  scale: 3;
}

.button:hover {
  color: #000000;
  scale: 1.1;
  /* box-shadow: 20 20px 20px rgba(0, 0, 0, 0.4); */
}

.button:active {
  scale: 1;
}
</style>
