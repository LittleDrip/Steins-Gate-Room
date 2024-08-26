<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import zhushou from '@/assets/img/people/zhushou.png';
import { useRouter } from "vue-router";
const router = useRouter();


const toPre = () => {
  router.push("/hall");
};
</script>

<template>
  <div class="all" style="text-align: center">
    <div class="context" style="display: inline-block; font-size: 4em">
      <p>Steins</p>
      <p>Gate</p>
      <p>の</p>
      <p>實驗室</p>
    </div>
    <div style="font-size: 1em; margin-top: .7em">El Psy Kongroo</div>
    <div style="margin-top: 1em"><img :src="zhushou" alt="" /></div>
    <button style="margin-top: 2em;color: #000;" class="button" @click="toPre">进 入</button>
    <div style="margin-top: 1.5em;font-weight: 500;">
      历史访客 <span id="busuanzi_value_page_pv">Loading</span>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 6em;
}

.all {

  font-weight: 550;
  font-family: "EvaSans";
  line-height: 1;
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
  width: 10em;
  height: 3em;
  cursor: pointer;
  position: relative;
  /* padding: 10px 24px; */
  padding: .8em 2em;
  font-size: 1.4em;
  color: white;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 1.88em;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}



.button:hover::before {
  scale: 3;
}

.button:hover {
  color: #000000;
  scale: 1.1;
  background-color: #ecd8ae;
  /* box-shadow: 20 20px 20px rgba(0, 0, 0, 0.4); */
}

.button:active {
  scale: 1;
}
</style>
