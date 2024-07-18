<script lang="ts" setup>
import cola from '@/assets/img/aside/cola.png';
import banana from '@/assets/img/aside/banana.png';
import microwave from '@/assets/img/aside/microwave.png';
import { useMusicInfoStore } from '@/stores/MusicInfo';
import { useStatusInfo } from '@/stores/StatusInfo';
const musicInfoStore = useMusicInfoStore();
const StatusInfo = useStatusInfo();
import { ref } from 'vue';
const drawer = ref(false)
const showPre = ref(false);
const showPre1 = ref(false);
const showPre2 = ref(false);
const showDiv1 = ref(true);
const showDiv2 = ref(false);
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
const showMusicList = () => {

}
const setting = () => {

}
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

    <div class="all">
        <el-image class="cola" @dragstart.prevent :src="cola" fit="cover" style="width: 3.125rem; cursor: pointer;"
            @mouseover="showPre = true" @mouseleave="showPre = false"
            @click="showMusicList(); drawer = true"></el-image>
        <el-image @dragstart.prevent :src="banana" fit="cover" style="margin-top: 1.25rem; cursor: pointer;"
            @mouseover="showPre1 = true" @mouseleave="showPre1 = false" @click="setting()"></el-image>
        <el-image @dragstart.prevent :src="microwave" fit="cover" style="margin-top: 1.25rem;  cursor: pointer;"
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
            <div style="display: flex; text-align: center; font-weight: 600; font-family: 'MiSans';">
                <div :class="{ active: currentTab === 'playlist' }" @click="showlist(); setActive('playlist')"
                    style="width: 12.5rem;">
                    <span :class="{ 'active-border': currentTab === 'playlist' }"
                        style="font-size: 1.25rem; color: #666;">播放列表</span>
                </div>
                <div :class="{ active: currentTab === 'addsong' }" @click="showadd(); setActive('addsong')"
                    style=" margin-left: 1.25rem; width: 12.5rem;">
                    <span :class="{ 'active-border': currentTab === 'addsong' }"
                        style="font-size: 1.25rem; color: #666;">添加歌曲</span>
                </div>
            </div>
            <div v-if="showDiv1" style="margin-top: 1.5rem;">
                <div class=" music-item" v-for="(item, index) in musicInfoStore.ListInfo" :key="index"
                    style="margin-top: 0.75rem;" :class="{ 'highlight': index === StatusInfo.currentSongIndex }">
                    <el-container style="height: 6.25rem;width: auto;">
                        <el-aside width="6.875rem" style="overflow: hidden;">
                            <img :src="item.picUrl" class="coverImg" loading="lazy"></img>
                        </el-aside>
                        <el-main style="overflow: hidden;">
                            <div class="main">
                                <div class="headTitle">{{ item.name }}</div>
                                <div class="content">
                                    <p>{{ item.author }}</p>
                                    <p style="margin: 1.375rem 0 0 13pc">{{ formatDuration(item.time) }}</p>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </div>
            <div v-if="showDiv2"></div>

        </el-drawer>
    </div>
</template>

<style scoped>
.all {
    width: 6.25rem;
    position: absolute;
    right: 0.5%;
    bottom: 10%;
    user-select: none
}


.list {
    position: absolute;
    padding: 0.3125rem 0.625rem;
    color: #ffffff;
    bottom: 20rem;
    right: 1.25rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}

.setting {
    position: absolute;
    padding: 0.3125rem 0.625rem;
    color: #ffffff;
    bottom: 13.75rem;
    right: 2.1875rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}

.about {
    position: absolute;
    padding: 0.3125rem 0.625rem;
    color: #ffffff;
    bottom: 8.75rem;
    right: 1.875rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    background-color: #0e1112;
    transform: translateY(-50%);
}


.all .el-image {
    transition: transform 0.05s ease;
}

.cola {
    right: -1.5rem;
    transition: transform 0.05s ease;
}

.cola:hover {
    transform: scale(6);
}

.all .el-image:hover {
    transform: scale(1.10);
}


.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(0.625rem);
}

.showTag {
    z-index: 100px;
}

.coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.625rem;
}

.main {
    width: 12.5rem;
    margin-top: -1rem;
    font-weight: normal;
}

.headTitle {
    font-size: 1.25rem;
    color: #333;
}

.content {
    font-size: 0.875rem;
    margin-top: 1.25rem;
    color: #999;
}


.music-item {
    border-radius: 0.375rem;
}

.music-item:hover {
    background-color: pink;
}

.highlight {
    background-color: #e6e6e6;
}

.active-border {
    border-bottom: 0.125rem solid red;
}
</style>
