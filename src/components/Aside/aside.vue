<script lang="ts" setup>
import cola from '@/assets/img/aside/cola.png';
import banana from '@/assets/img/aside/banana.png';
import microwave from '@/assets/img/aside/microwave.png';
import back from '@/assets/img/aside/back.png';
import Setting from '@/components/Aside/setting.vue';
import backyes from '@/assets/img/aside/backyes.png';
import { useMusicInfoStore } from '@/stores/MusicInfo';
import { useStatusInfo } from '@/stores/StatusInfo';
const musicInfoStore = useMusicInfoStore();
const StatusInfo = useStatusInfo();
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import router from '@/router';

const drawer = ref(false);
const drawer2 = ref(false);
const showPre = ref(false);
const showPre1 = ref(false);
const showPre2 = ref(false);
const showDiv1 = ref(true);
const showDiv2 = ref(false);
const isLeaving = ref(false);
const centerDialogVisible = ref(false)


const currentTab = ref('playlist');  // 默认选中的标签


const setActive = (tab: any) => {
    currentTab.value = tab;
};
const showlist = () => {
    showDiv1.value = true;
    showDiv2.value = false; // 点击展示1后，隐藏展示2
};

const showadd = () => {
    showDiv2.value = true;
    showDiv1.value = false; // 点击展示2后，隐藏展示1
};

const AboutMe = () => {

}
const handleClose = (done: () => void) => {
    done()
}
const formatDuration = (milliseconds: any) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}
</script>

<template>
    <div style="position: fixed;">
        <img class="backImg" @click="centerDialogVisible = true" :src="back"
            style="width: 6.5em;margin-top: 0.5em;margin-left: 0.2em;cursor: pointer; ">
    </div>
    <div>
        <el-dialog style="margin-top: 15em; width: 25em;;--color: rgba(114, 114, 114, 0.3);
  background-color: #f2f3f2;
  background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
      linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
  background-size: 55px 55px;" v-model="centerDialogVisible" center title="" width="415" align-center>
            <template #header style="display: inline-block;">

                <img style="width: 10em;margin-left: 0em;" :src="backyes">
            </template>
            <template #footer>
                <div class="dialog-footer">
                    <button @click="centerDialogVisible = false; isLeaving = true; router.push('/hall')">确认</button>
                    <button style="background: #93cefa;"
                        @click=" isLeaving = false; centerDialogVisible = false">算了</button>
                </div>
            </template>
        </el-dialog>
    </div>

    <div class="all">
        <el-image class="cola" @dragstart.prevent :src="cola" fit="cover" style="width: 3.125em; cursor: pointer;"
            @mouseover="showPre = true" @mouseleave="showPre = false" @click=" drawer = true"></el-image>
        <el-image @dragstart.prevent :src="banana" fit="cover" style="margin-top: 1.25em; cursor: pointer;"
            @mouseover="showPre1 = true" @mouseleave="showPre1 = false" @click="drawer2 = true"></el-image>
        <el-image @dragstart.prevent :src="microwave" fit="cover" style="margin-top: 1.25em;  cursor: pointer;"
            @mouseover="showPre2 = true" @mouseleave="showPre2 = false" @click="AboutMe()"></el-image>
    </div>
    <div class="showTag">
        <transition name="fade">
            <div v-if="showPre == true" class="list">播放列表</div>
        </transition>
        <transition name="fade">
            <div v-if="showPre1 == true" class="setting">设置</div>
        </transition>
        <transition name="fade">
            <div v-if="showPre2 == true" class="about">关于</div>
        </transition>
    </div>

    <div class="drawer">

        <el-drawer v-model="drawer" :with-header="false" direction="rtl" :before-close="handleClose" :size="0">
            <div style="display: flex; text-align: center; font-weight: 600;">
                <div :class="{ active: currentTab === 'playlist' }" @click="showlist(); setActive('playlist')"
                    style="width: 12.5em;">
                    <span :class="{ 'active-border': currentTab === 'playlist' }"
                        style="font-size: 1.25em; color: #666;">播放列表</span>
                </div>
                <div :class="{ active: currentTab === 'addsong' }" @click="showadd(); setActive('addsong')"
                    style=" margin-left: 1.25em; width: 12.5em;">
                    <span :class="{ 'active-border': currentTab === 'addsong' }"
                        style="font-size: 1.25em; color: #666;">添加歌曲</span>
                </div>
            </div>
            <div v-if="showDiv1" style="margin-top: 1.5em;">
                <div class=" music-item" v-for="(item, index) in musicInfoStore.ListInfo" :key="index"
                    style="margin-top: 0.75em;" :class="{ 'highlight': index === StatusInfo.currentSongIndex }">
                    <el-container @click="StatusInfo.setSongIndex(index);"
                        style="height: 6.25em;width: auto;cursor: pointer;">
                        <el-aside width="6.875em" style="overflow: hidden;">
                            <img :src="item.picUrl" class="coverImg" loading="lazy"></img>
                        </el-aside>
                        <el-main style="overflow: hidden;">
                            <div class="main">
                                <div class="headTitle">{{ item.name }}</div>
                                <div class="content">
                                    <p>{{ item.author }}</p>
                                    <p style="margin: 1.375em 0 0 13pc">{{ formatDuration(item.time) }}</p>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </div>
            <div v-if="showDiv2">2</div>

        </el-drawer>

        <!-- ---------------------------drawer2---------------- -->
        <el-drawer v-model="drawer2" :with-header="false" direction="rtl" :before-close="handleClose" :size="0">
            <Setting />

        </el-drawer>
    </div>
</template>

<style scoped>
.all {
    width: 6.25em;
    position: absolute;
    right: 0.5%;
    bottom: 10%;
    user-select: none
}


.list {
    position: absolute;
    padding: 0.3125em 0.625em;
    color: #ffffff;
    bottom: 20em;
    right: 1.25em;
    border-radius: 0.25em;
    white-space: nowrap;
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}

.setting {
    position: absolute;
    padding: 0.3125em 0.625em;
    color: #ffffff;
    bottom: 13.75em;
    right: 2.1875em;
    border-radius: 0.25em;
    white-space: nowrap;
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}

.about {
    position: absolute;
    padding: 0.3125em 0.625em;
    color: #ffffff;
    bottom: 8.75em;
    right: 1.875em;
    border-radius: 0.25em;
    white-space: nowrap;
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}


.all .el-image {
    transition: transform 0.05s ease;
}

.cola {
    right: -1.5em;
    transition: transform 0.05s ease;
}

.cola:hover {
    transform: scale(6);
}

.all .el-image:hover {
    transform: scale(1.10);
}

.backImg {
    transition: transform 0.1s ease;
    /* 平滑过渡效果 */
}

.backImg:hover {
    transform: scale(1.1);
    /* 鼠标悬浮时放大 */
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(0.625em);
}

.showTag {
    z-index: 100px;
}

.coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.625em;
}

.main {
    width: 12.5em;
    margin-top: -1em;
    font-weight: normal;
}

.headTitle {
    font-size: 1.25em;
    color: #333;
}

.content {
    font-size: 0.875em;
    margin-top: 1.25em;
    color: #999;
}


.music-item {
    border-radius: 0.375em;
}

.music-item:hover {
    background-color: pink;
}

.highlight {
    background-color: #e6e6e6;
}

.active-border {
    border-bottom: 0.125em solid red;
}



button {
    background: #fbca1f;
    padding: 0.6em 1.3em;
    font-weight: 900;
    font-size: 1em;
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em;
    cursor: pointer;
    margin-right: 2em;
    margin-left: 2em;
}

button:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
}

button:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
}
</style>
