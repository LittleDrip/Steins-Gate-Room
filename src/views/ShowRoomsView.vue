<script lang="ts" setup>
import hallBg from "@/assets/img/bg/HallBg.png";
import bg1 from '@/assets/img/showBg/bg1.png';
import bg2 from '@/assets/img/showBg/bg2.png';
import bg3 from '@/assets/img/showBg/bg3.png';
import bg4 from '@/assets/img/showBg/bg4.png';
import bg5 from '@/assets/img/showBg/bg5.png';
import bg6 from '@/assets/img/showBg/bg6.png';

import logo from "@/assets/img/logo/logo.png";
import { ref } from "vue";
import router from "@/router";
const show = ref(true);
</script>

<template>
  <div class="bg">
    <img :src="hallBg"></img>
  </div>

  <div class="all">
    <div class="header">
      <img :src="logo" alt="" width="140px" style="transform:translateY(30%);" />
    </div>
    <div class="list">
      <!-- ------------------------------- -->
      <el-row :gutter="50">
        <el-col :span="10" :offset="1">
          <div class="common-layout" @click="router.push('/room?id=1')">
            <el-container style="height: 140px;">
              <el-aside width="170px"><img :src="bg1" class="coverImg"></img></el-aside>
              <el-main>
                <div class="main">
                  <div class="headTitle">未来道具研究所</div>
                  <div class="content">
                    <p>呼哈哈哈哈哈！能在这里相遇一定是命运石之门的选择！</p>
                  </div>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-col>

        <el-col :span="10" :offset="1">
          <div class="common-layout">
            <el-container style="height: 140px;">
              <el-aside width="170px"><img :src="bg2" class="coverImg"></img></el-aside>
              <el-main>
                <div class="main">
                  <div class="headTitle">SERN研究所</div>
                  <div class="content" style="font-family: 'ErrorSans';">
                    <p>先一起喊：El Psy Kongroo!</p>
                  </div>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-col>
      </el-row>

      <!-- -------------------------------------------- -->



    </div>

  </div>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
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


.header {
  line-height: 50px;
  width: 100vw;
  background-color: #dab395;
  position: fixed;
  top: 0;
  z-index: -10;
}

.list {
  margin-top: 60px;
  overflow-x: hidden;
  /* 阻止横向滚动 */
}

.box {
  display: block;
  background-color: wheat;
}

.common-layout {
  font-family: "MiSans";
  margin-top: 25px;
  border: 3px solid #b79581;
  background-color: #fff;
  width: 650px;
  /* 高度设置为500px，也可以根据需要调整 */
  overflow: hidden;
  /* height: inherit; */
  border-radius: 10px;

}

.coverImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-aside {
  line-height: 0;
}

.headTitle {

  font-weight: 500;
  font-size: 25px;
  padding: 0%;
  margin-left: -10px;
  margin-top: -10px;
}

.content {
  padding: 0%;
  color: #999;
  margin-left: -10px;
  margin-top: 10px;
}

.common-layout {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* 平滑过渡效果 */
}

.common-layout:hover {
  transform: translateY(-5px);
  cursor: pointer;
  /* 悬浮时上移 */
  box-shadow: -5px 2px 10px 1px #b79581;
  /* 添加阴影 */
}
</style>
