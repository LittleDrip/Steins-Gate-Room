<script lang="ts" setup>
import logo from "@/assets/img/logo/logo.png";
import { bgImgs } from '@/utils/bgUtils';
import { getAvatarUrlById } from '@/utils/avatarUtils';
import { useMusicInfoStore } from '@/stores/MusicInfo';
import { useUserStore } from '@/stores/roomUsers';
const userStore = useUserStore();
// ------------------------
import Login from '@/components/Login/login.vue';
import PortalUsers from '@/components/Head/PortalUsers.vue';
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
import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue';
const changesizeSpan = ref(11);
const changesizeSpanOffset = ref(0);
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

function handleMobileScreen() {
  const body = document.body;
  if (!body) {
    return;
  }
  const { clientWidth, clientHeight } = body;
  if (clientWidth < clientHeight) {
    body.style.fontSize = '3vw';
    changesizeSpan.value = 22;
    changesizeSpanOffset.value = 1;

  } else {
    body.style.fontSize = '2vh';
    changesizeSpan.value = 11;
    changesizeSpanOffset.value = 0;
  }
}

onMounted(() => {
  handleMobileScreen()
  window.addEventListener('resize', handleMobileScreen);

  musicInfoStore.removeAll();
  // window.addEventListener('resize', handleMobileScreen);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleMobileScreen);

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
      <PortalUsers style="position: absolute;" />
      <div class="header">
        <img :src="logo" alt="" style=" width: 10em;;transform:translateY(30%);" />
      </div>

      <el-scrollbar always max-height="100vh">
        <div class="list">
          <!-- ------------------------------------------- -->

          <el-row>
            <el-col :span="11" :xs="changesizeSpan" :offset="1" style="margin-right: 2em;">
              <div class="common-layout" @click="router.push('/room?id=1')">
                <el-container>
                  <el-aside><img :src="bgImgs[0]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">未来道具研究所</div>
                      <div class="content">
                        <p>呼哈哈哈哈哈！能在这里相遇一定是命运石之门的选择</p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['1']">
                            <img loading="lazy" :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=2')">
                <el-container>
                  <el-aside><img loading="lazy" :src="bgImgs[1]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">SERN研究所</div>
                      <div class="content">
                        <p>先一起喊：El Psy Kongroo!</p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['2']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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
                  <el-aside><img loading="lazy" :src="bgImgs[2]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">电器街</div>
                      <div class="content">
                        <p>不管在哪条世界线，你都不是一个人</p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['3']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=4')">
                <el-container>
                  <el-aside><img loading="lazy" :src="bgImgs[3]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">女仆咖啡厅</div>
                      <div class="content">
                        <p>嘟 ~ 嘟 噜 ~ </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['4']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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
                  <el-aside><img loading="lazy" :src="bgImgs[4]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">β世界线</div>
                      <div class="content">
                        <p>不管在哪条世界线，你都不是一个人</p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['5']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=6')">
                <el-container>
                  <el-aside><img loading="lazy" :src="bgImgs[5]" class="coverImg"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">显像管工房</div>
                      <div class="content">
                        <p>Okey dokey! </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['6']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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
                  <el-aside><img :src="bgImgs[6]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">轻音乐专区</div>
                      <div class="content">
                        <p>赶走一切坏心情 ~ </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['7']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=8')">
                <el-container>
                  <el-aside><img :src="bgImgs[7]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">流行歌分享</div>
                      <div class="content">
                        <p>“人在城乡结合部 心在巴黎时装周 ” </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['8']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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
                  <el-aside><img :src="bgImgs[8]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">欧美专区</div>
                      <div class="content">
                        <p>奔跑在日落和浪漫里 </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['9']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=10')">
                <el-container>
                  <el-aside><img :src="bgImgs[9]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">粤语经典</div>
                      <div class="content">
                        <p>安静下来 用心听…</p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['10']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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
              <div class="common-layout" @click="router.push('/room?id=11')">
                <el-container>
                  <el-aside><img :src="bgImgs[10]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">国风民谣</div>
                      <div class="content">
                        <p>一曲惊鸿，千里醉人间 </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['11']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </el-col>

            <el-col :span="11" :xs="changesizeSpan" :offset="changesizeSpanOffset">
              <div class="common-layout" @click="router.push('/room?id=12')">
                <el-container>
                  <el-aside><img :src="bgImgs[11]" class="coverImg" loading="lazy"></img></el-aside>
                  <el-main>
                    <div class="main">
                      <div class="headTitle">Jay</div>
                      <div class="content">
                        <p>周杰伦歌单专场！ </p>
                        <div class="avatarContainer">
                          <div class="avatarInCard" v-for="(item, key) in userStore.roomUsers['12']">
                            <img :src="getAvatarUrlById(item.avatar)" alt="">
                          </div>
                        </div>
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

.avatarContainer {
  display: flex;
}

.avatarInCard {
  margin-top: 2em;
  margin-left: .3em;
}

.avatarInCard img {

  width: 3.2em;
  height: 3.2em;
  border-radius: 50%;
  border: .2em solid rgba(229, 131, 147, 0.4);

}

.all {
  -webkit-transition: .2s;
  transition: .2s;
  /* height: 100vh; */
}

.el-main {
  padding: 0 !important;
}

.header {
  line-height: 3.2em;
  width: 100vw;
  height: 3.2em;
  background-color: #dab395;
  position: absolute;
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
  font-size: 1.4em;
  padding: 0%;
  margin-top: 0.2em;
}

.content {
  padding: 0%;
  color: #6e8194;
  font-size: .8em;
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
