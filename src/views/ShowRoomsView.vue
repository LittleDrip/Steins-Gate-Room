<script lang="ts" setup>
import bg1 from '@/assets/img/showBg/bg1.jpg';
import bg2 from '@/assets/img/showBg/bg2.jpg';
import bg3 from '@/assets/img/showBg/bg3.jpg';
import bg4 from '@/assets/img/showBg/bg4.jpg';
import bg5 from '@/assets/img/showBg/bg5.jpg';
import bg6 from '@/assets/img/showBg/bg6.jpg';
import logo from "@/assets/img/logo/logo.png";
import { useMusicInfoStore } from '@/stores/MusicInfo';
// ------------------------
import Login from '@/components/Login/login.vue';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const showLogin = ref(true);
const onLoginSuccess = () => {
  authStore.login();
};
// ------------------------

const musicInfoStore = useMusicInfoStore();
import router from "@/router";
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
const changesizeSpan = ref(11);
const changesizeSpanOffset = ref(0);
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
function handleMobileScreen() {
  // 获取屏幕宽度和高度

  // 判断是否为手机屏幕
  if (screenWidth < screenHeight) {
    changesizeSpan.value = 22;
    changesizeSpanOffset.value = 1;
  } else {
    changesizeSpan.value = 11;
    changesizeSpanOffset.value = 0;
  }
}
handleMobileScreen();
onMounted(() => {
  musicInfoStore.removeAll();

})
</script>

<template>

  <div class="bg">
  </div>
  <div class="mengban"></div>

  <el-watermark gap="2" zIndex="-100" font="font" :content="['Steins;Gate']">

    <div class="all">
      <Transition name="fade" appear>
        <Login style="position: absolute;" v-if="!authStore.isLoggedIn" @loginSuccess="onLoginSuccess" />
      </Transition>
      <div class="header">
        <img :src="logo" alt="" width="10%" style="transform:translateY(30%);" />
      </div>
      <el-scrollbar always max-height="50em">
        <div class="list">
          <!-- ------------------------------------------- -->

          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=1')">
                <el-container>
                  <el-aside><img :src="bg1" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">未来道具研究所</div>
                      <div class="content">
                        <p>呼哈哈哈哈哈！能在这里相遇一定是命运石之门的选择</p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=2')">
                <el-container>
                  <el-aside><img :src="bg2" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">SERN研究所</div>
                      <div class="content">
                        <p>先一起喊：El Psy Kongroo!</p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>

          <!-- -------------------------------------------- -->
          <!-- -------------------------------------------- -->
          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=3')">
                <el-container>
                  <el-aside><img :src="bg3" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">电器街</div>
                      <div class="content">
                        <p>不管在哪条世界线，你都不是一个人</p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=4')">
                <el-container>
                  <el-aside><img :src="bg4" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">女仆咖啡厅</div>
                      <div class="content">
                        <p>嘟 ~ 嘟 噜 ~ </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>

          <!-- -------------------------------------------- -->
          <!-- -------------------------------------------- -->
          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=5')">
                <el-container>
                  <el-aside><img :src="bg5" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">β世界线</div>
                      <div class="content">
                        <p>不管在哪条世界线，你都不是一个人</p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=6')">
                <el-container>
                  <el-aside><img :src="bg6" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">显像管工房</div>
                      <div class="content">
                        <p>Okey dokey! </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>

          <!-- -------------------------------------------- -->
          <!-- -------------------------------------------- -->
          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=7')">
                <el-container>
                  <el-aside><img :src="bg5" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">轻音乐专区</div>
                      <div class="content">
                        <p>赶走一切坏心情 ~ </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=8')">
                <el-container>
                  <el-aside><img :src="bg6" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">流行歌分享</div>
                      <div class="content">
                        <p>Okey dokey! </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>

          <!-- -------------------------------------------- -->
          <!-- -------------------------------------------- -->
          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=9')">
                <el-container>
                  <el-aside><img :src="bg5" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">轻音乐专区</div>
                      <div class="content">
                        <p>赶走一切坏心情 ~ </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=10')">
                <el-container>
                  <el-aside><img :src="bg6" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">流行歌分享</div>
                      <div class="content">
                        <p>Okey dokey! </p>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>

          <!-- -------------------------------------------- -->


        </div>
      </el-scrollbar>
    </div>
  </el-watermark>
</template>

<style scoped>
.mengban {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.95;
  z-index: -100;
  overflow: hidden;
  backdrop-filter: blur(0.6px);
  background-color: hsla(0, 0%, 100%, .09);
  z-index: -99;
}

.bg {
  background-color: #f5e9c9;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  opacity: 0.95;
  z-index: -100;
}

.bg img {
  width: 100%;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  cursor: default;
  pointer-events: none;
}

.all {
  -webkit-transition: .2s;
  transition: .2s;
}

.el-main {
  padding: 0 !important;
}

.header {
  line-height: 3.2em;
  width: 100vw;
  background-color: #dab395;
  position: fixed;
  top: 0;
  z-index: 100;
}

.main {
  overflow: hidden;

}

.list {
  margin-top: 3.2em;
  margin-left: -1%;
  overflow-x: hidden;
  /* 阻止横向滚动 */
}

.el-row {
  /* z-index: -10; */

}

.box {
  display: block;
  background-color: wheat;
}

.common-layout {
  margin-top: 1.6em;
  border: 3px solid #b79581;
  background-color: #fff;
  /* width: 41em; */
  overflow: hidden;
  /* height: inherit; */
  border-radius: .6em;
}

.el-container {
  height: 8.5em;
}

.coverImg {
  width: 100%;
  width: 9.0em;
  height: 9.5em;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.el-aside {
  line-height: 0;
  width: 9.5em;
}



.headTitle {
  /* font-size: 25px; */
  font-size: 1.5em;
  padding: 0%;
  margin-top: 0.2em;
}

.content {
  padding: 0%;
  color: #6e8194;
  font-size: .9em;
  margin-left: 0.1em;
  margin-top: 0.6em;
  z-index: 1;
}

.common-layout {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  /* 平滑过渡效果 */
}

.common-layout:hover {
  /* transform: translateY(-5px); */
  transform: translateY(-.3em);
  cursor: pointer;
  /* 悬浮时上移 */
  box-shadow: -5px 2px 10px 1px #b79581;
  /* 添加阴影 */
}

/* 应用于嵌套元素的规则 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
