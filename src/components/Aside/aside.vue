<script lang="ts" setup>
import Github from '@/assets/svg/Github.svg';
import cola from '@/assets/img/aside/cola.png';
import banana from '@/assets/img/aside/banana.png';
import microwave from '@/assets/img/aside/microwave.png';
import back from '@/assets/img/aside/back.png';
import Wupa from '@/assets/img/aside/Wupa.png';
import Setting from '@/components/Aside/setting.vue';
import backyes from '@/assets/img/aside/backyes.png';
import { useMusicInfoStore } from '@/stores/MusicInfo';
import { useStatusInfo } from '@/stores/StatusInfo';
import chatHistory from '@/components/Aside/chatHistory.vue';
import About from '@/components/Aside/About.vue';
import { getMusicSearchResults, getMusicDetail } from '@/api/music';
const musicInfoStore = useMusicInfoStore();
const StatusInfo = useStatusInfo();
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { cacheMusicList } from '@/api/userlist';
// import { useRoute } from 'vue-router';
const route = useRoute();


const drawer = ref(false);
const drawer2 = ref(false);
const drawer3 = ref(false);
const showPre = ref(false);
const showPre1 = ref(false);
const showPre2 = ref(false);
const showPre3 = ref(false);
const showDiv1 = ref(true);
const showDiv2 = ref(false);
const showPage1 = ref(true);
const showPage2 = ref(false);
const showPage3 = ref(false);
const isLeaving = ref(false);
const centerDialogVisible = ref(false)
const centerDialogVisible2 = ref(false)
const popoverVisible = ref<{ [key: string]: boolean }>({});


const currentTab = ref('playlist');  // 默认选中的标签

const searchKeyword = ref(''); // 新增搜索关键词
const searchResults = ref([]); // 新增搜索结果

const searchMusic = async () => {
    if (searchKeyword.value.trim() !== '') {
        try {
            const response = await getMusicSearchResults(searchKeyword.value);
            searchResults.value = response.result.songs.map((song: any) => ({
                id: song.id,
                name: song.name,
                artists: song.ar,
                album: song.al,
                duration: song.dt
            }));
        } catch (error) {
            console.error('搜索失败:', error);
        }
    }
};

const setActive = (tab: any) => {
    currentTab.value = tab;
};
const showlist = () => {
    showDiv1.value = true;
    showDiv2.value = false; // 点击展示1后，隐藏展示2
};
const fun_showPage1 = () => {
    showPage1.value = true;
    showPage2.value = false; // 点击展示1后，隐藏展示2
    showPage3.value = false; // 点击展示1后，隐藏展示2

};
const fun_showPage2 = () => {
    showPage1.value = false;
    showPage3.value = false; // 点击展示1后，隐藏展示2
    showPage2.value = true; // 点击展示1后，隐藏展示2

};
const fun_showPage3 = () => {
    showPage1.value = false;
    showPage3.value = true; // 点击展示1后，隐藏展示2
    showPage2.value = false; // 点击展示1后，隐藏展示2

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
const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const addSongToPlaylist = async (song: Song) => {
    // 检查是否正在处理该歌曲
    if (isProcessing.value[song.id]) {
        return;
    }

    // 检查歌曲是否已存在
    const isDuplicate = musicInfoStore.ListInfo.some(item => item.name === song.name);
    console.log(musicInfoStore.ListInfo)
    if (isDuplicate) {
        ElMessage({
            type: 'warning',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 该歌曲已在播放列表中~'
        });
        popoverVisible.value[song.id] = false;
        return;
    }
    try {
        // 设置处理标志
        isProcessing.value[song.id] = true;
        const response = await getMusicDetail(song.id);
        const songUrl = response.data[0].url;

        const songInfo = {
            id: song.id,
            name: song.name,
            picUrl: song.album.picUrl || '',
            author: song.artists[0].name,
            time: song.duration,
            url: songUrl
        };
        musicInfoStore.addSongToList(songInfo);

        // 更新缓存
        try {
            await cacheMusicList(route.query.id, musicInfoStore.ListInfo);
        } catch (error) {
            console.error('缓存更新失败:', error);
        }

        popoverVisible.value[song.id] = false;
        // 添加成功提示
        ElMessage({
            type: 'success',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 已添加到播放列表~'
        });
    } catch (error) {
        console.error('获取歌曲详细信息失败:', error);
        ElMessage({
            type: 'error',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 添加失败，请稍后重试~'
        });
    } finally {
        // 清除处理标志
        isProcessing.value[song.id] = false;
    }
};

interface Song {
    id: number;
    name: string;
    album: { picUrl: string };
    artists: { name: string }[];
    duration: number;
}

interface SongInfo {
    id: number;
    name: string;
    picUrl: string;
    author: string;
    time: number;
    url: string;
}

// 添加防抖控制
const isProcessing = ref<{ [key: number]: boolean }>({});

const playNext = async (song: Song) => {
    // 检查是否正在处理该歌曲
    if (isProcessing.value[song.id]) {
        return;
    }

    // 检查歌曲是否已存在
    const isDuplicate = musicInfoStore.ListInfo.some(item => item.id === song.id);

    if (isDuplicate) {
        ElMessage({
            type: 'warning',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 该歌曲已在播放列表中~'
        });
        popoverVisible.value[song.id] = false;
        return;
    }

    try {
        // 设置处理标志
        isProcessing.value[song.id] = true;
        const response = await getMusicDetail(song.id);
        const songUrl = response.data[0].url;

        const songInfo: SongInfo = {
            id: song.id,
            name: song.name,
            picUrl: song.album.picUrl || '',
            author: song.artists[0].name,
            time: song.duration,
            url: songUrl
        };

        const currentIndex = StatusInfo.currentSongIndex;


        musicInfoStore.ListInfo.splice(currentIndex + 1, 0, songInfo);
        // 更新缓存
        try {
            await cacheMusicList(route.query.id, musicInfoStore.ListInfo);
        } catch (error) {
            console.error('缓存更新失败:', error);
        }
        popoverVisible.value[song.id] = false;
        // 添加成功提示
        ElMessage({
            type: 'success',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 已添加到下一首播放~'
        });
    } catch (error) {
        console.error('获取歌曲详细信息失败:', error);
        ElMessage({
            type: 'error',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 添加失败，请稍后重试~'
        });
    } finally {
        // 清除处理标志
        isProcessing.value[song.id] = false;
    }
};

const requestSong = async (song: Song) => {
    // 检查是否正在处理该歌曲
    if (isProcessing.value[song.id]) {
        return;
    }

    try {
        // 设置处理标志
        isProcessing.value[song.id] = true;
        const response = await getMusicDetail(song.id);
        const songUrl = response.data[0].url;

        const songInfo: SongInfo = {
            id: song.id,
            name: song.name,
            picUrl: song.album.picUrl || '',
            author: song.artists[0].name,
            time: song.duration,
            url: songUrl
        };

        // 添加到点歌列表
        musicInfoStore.addSongToRequestList(songInfo);

        // 发送点歌消息到WebSocket
        const socket = (window as any).chatSocket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'requestSong',
                song: songInfo,
                requester: localStorage.getItem("nickName")
            }));
        }

        popoverVisible.value[song.id] = false;
        // 添加成功提示
        ElMessage({
            type: 'success',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 点歌成功，将在下一首播放~'
        });
    } catch (error) {
        console.error('获取歌曲详细信息失败:', error);
        ElMessage({
            type: 'error',
            customClass: 'msgInfo',
            plain: true,
            message: '🍥 点歌失败，请稍后重试~'
        });
    } finally {
        // 清除处理标志
        isProcessing.value[song.id] = false;
    }
};
</script>

<template>

    <el-dialog style="border-radius: 1.1em;margin-top:8em; width: 30em;min-height: 23em;--color: rgba(114, 114, 114, 0.3);
  background-color: #f2f3f2;
  background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
      linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
  background-size: 55px 55px;" v-model="centerDialogVisible2" center title="" align-center>

        <template #header style="display: inline-block;">
            <div>
                <Transition name="fade2">
                    <h2 style="color: #333;" v-if="showPage1">关于本站</h2>
                </Transition>
                <Transition name="fade2">
                    <h2 style="color: #333;" v-if="showPage2">关于作者</h2>
                </Transition>
                <Transition name="fade2">
                    <h2 style="color: #333;" v-if="showPage3">常见问题</h2>
                </Transition>

            </div>

        </template>

        <div v-if="showPage1" style="color: #333;font-size: 1.2em;line-height: 1.8;padding: 0 1em;">
            <p>呼哈哈哈哈哈，我是Drip，在介绍本站前先由衷感谢BlackCarDriver对此站界面UI提供和技术支持。 </p>
            <p><strong
                    style="color: #df6973;">为什么会有此站？</strong>最初是本人在无聊之时偶然发现一个极具特色的一个网站，主题和风格都特别讨喜，于是我就想着能不能做一个<strong>《命运石之门》</strong>主题的。说干就干！就开始慢慢写了~
            </p>
            <p>目前本站仍在完善中,如果有奇奇怪怪的bug或建议，都欢迎大家向我提供完善建议～</p>

            <strong style="color: #df6973;">欢迎加入大家庭：</strong>
            <span> Labmemの秘密基地：Q群-- <span style=" cursor: pointer;color:
                #cb819f;">335463956</span></span>
        </div>

        <div v-if="showPage2" style="color: #333;font-size: 1.2em;line-height: 1.8;padding: 0 1em;">
            <div style="display: flex; flex-direction: column; align-items: center;transform: translateX(-.8em);">
                <el-avatar style="width: 8em;height: 8em;  border: .1em solid white; "
                    src=" https://pic.imgdb.cn/item/66bb1bf0d9c307b7e9b2b2d8.jpg"></el-avatar>
                <div class="avatarBoxNick avatarSmall">Drip </div>
                <div style="font-size: .9em;margin-top: 1em;text-align: center">
                    邮箱地址：<a style="color: palevioletred;" href="mailto:drippp0127@gmail.com">drippp0127@gmail.com</a>
                    <p>Github: <a style="color: palevioletred;"
                            href="https://github.com/LittleDrip/Steins-Gate-Room/">Steins-Gate-Room</a>
                    </p>
                    <p style="margin-top: 1em;">
                        大家好，我是本站的作者Drip，欢迎大家来到石头门聊天室。欢迎大家交流各种问题，优化建议。大家可以讨论一切你感兴趣的话题。

                        如果你有任何想法或反馈，请随时告诉我，我会尽力不断改进这个网站，提升大家的体验。</p>
                </div>
            </div>
        </div>
        <div v-if="showPage3" style="color: #333;font-size: 1.2em;line-height: 1.8;padding: 0 1em;">
            <strong style="color: #df6973;">1. 手机版支持问题</strong>
            <p style="color:gray;">目前对部分机型和浏览器的样式和功能支持不太完善，如部分机型只能使用系统音量来调节大小,如果有能力，建议大家尽可能使用电脑浏览。</p>
            <br>
            <strong style="color: #df6973;">2. 网页卡顿/加载慢？</strong>
            <p style="color:gray">放心，不是你们的问题。是作者的荷包有限，买的服务器很烂，大家不要生气，如果本站人多的话会考虑升级配置的。最后，El Psy Kongroo~</p>


        </div>


        <template #footer>
            <div>
                <!-- ← →-->
                <div style="text-align: right;display: block;">
                    <span v-if="showPage1" style="font-size: 5em;cursor: pointer;" @click="fun_showPage2()">→</span>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <span v-if="showPage2" style="font-size: 5em;cursor: pointer;" @click="fun_showPage1()">←</span>
                    <span v-if="showPage2" style="font-size: 5em;cursor: pointer;" @click="fun_showPage3()">→</span>
                </div>

                <span v-if="showPage3" style="font-size: 5em;cursor: pointer;" @click="fun_showPage2()">←</span>

            </div>
        </template>

    </el-dialog>



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
        <div class="fakeCircle"></div>
        <el-image class="cola" @dragstart.prevent :src="cola" fit="cover" style="width: 2.6em; cursor: pointer;"
            @mouseover="showPre = true" @mouseleave="showPre = false" @click=" drawer = true"></el-image>
        <div class="fakeCircle1"></div>

        <el-image @dragstart.prevent :src="banana" fit="cover" style="width: 5em; margin-top: 1em; cursor: pointer;"
            @mouseover="showPre1 = true" @mouseleave="showPre1 = false" @click="drawer2 = true"></el-image>
        <div class="fakeCircle2"></div>

        <el-image @dragstart.prevent :src="Wupa" fit="cover" style="width: 3em; margin-top: 1em; cursor: pointer;"
            @mouseover="showPre2 = true" @mouseleave="showPre2 = false" @click="drawer3 = true"></el-image>
        <div class="fakeCircle3"></div>

        <el-image @dragstart.prevent :src="microwave" fit="cover" style="width: 6em;;margin-top: 1em;  cursor: pointer;"
            @mouseover="showPre3 = true" @mouseleave=" showPre3 = false"
            @click="centerDialogVisible2 = true"></el-image>

    </div>
    <div class="showTag">
        <transition name="fade">
            <div v-if="showPre == true" class="list">播放列表</div>
        </transition>
        <transition name="fade">
            <div v-if="showPre1 == true" class="setting">设置</div>
        </transition>
        <transition name="fade">
            <div v-if="showPre2 == true" class="chathistory">聊天记录</div>
        </transition>
        <transition name="fade">
            <div v-if="showPre3 == true" class="about">关于</div>
        </transition>
    </div>

    <div class="drawer ScrollDiv">

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
                <div class=" music-item " v-for="(item, index) in musicInfoStore.ListInfo" :key="index"
                    style="margin-top: 0.75em;" :class="{ 'highlight': index === StatusInfo.currentSongIndex }">
                    <el-container @click="StatusInfo.setSongIndex(index); StatusInfo.changeSongIndex()"
                        style="height: 6.25em;width: auto;cursor: pointer;">
                        <el-aside width="6.875em" style="overflow: hidden;">
                            <img :src="item.picUrl" class="coverImg" loading="lazy"></img>
                        </el-aside>
                        <el-main style="overflow: hidden;">
                            <div class="main">
                                <div class="headTitle">{{ item.name }}</div>
                                <div class="content">
                                    <p>{{ item.author }}</p>
                                    <p style="margin: 1em 0 0 16em">{{ formatDuration(item.time) }}</p>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </div>
            <div v-if="showDiv2">
                <div style="text-align: center; line-height: 2em; margin-top: 2em; max-width: 30em;">
                    <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1em;">
                        <input v-model="searchKeyword" placeholder="输入关键词搜索歌曲" @keyup.enter="searchMusic"
                            style="padding: 0.5em; border-radius: 0.5em; border: 1px solid #ccc; width: 60%;" />
                        <button @click="searchMusic"
                            style="margin-left: 0.5em; padding: 0.5em 1em; border-radius: 0.5em; background-color: #fbca1f; border: none; cursor: pointer;">
                            搜索
                        </button>
                    </div>
                    <div v-if="searchResults.length > 0">
                        <ul style="list-style: none; padding: 0;">
                            <li v-for="song in searchResults" :key="song.id"
                                style="border-bottom: 1px solid #ddd; padding-bottom: .3em; text-align: left;">

                                <el-popover placement="right" width="auto" trigger="click"
                                    v-model:visible="popoverVisible[song.id]">
                                    <template #reference>
                                        <div style="cursor: pointer;">
                                            <p style="font-weight: bold;">{{ song.name }}</p>
                                            <p style="color: #666;">{{ song.artists[0].name }}</p>
                                            <p style="color: #999; text-align: right;">{{ formatDuration(song.duration)
                                                }}</p>
                                        </div>
                                    </template>
                                    <div style="display: flex; flex-direction: column; align-items: stretch;">
                                        <h3 @click="addSongToPlaylist(song)"
                                            style="   color: black; cursor: pointer;justify-content: center;align-items: center;text-align: center;    ">
                                            加入播放列表
                                        </h3>
                                        <hr style="margin: 1em; border: none; border-top: 1px solid #ddd;">
                                        <h3 @click="playNext(song)"
                                            style="   color: black; cursor: pointer;justify-content: center;align-items: center;text-align: center;    ">
                                            下一首播放
                                        </h3>
                                        <hr style="margin: 1em; border: none; border-top: 1px solid #ddd;">
                                        <h3 @click="requestSong(song)"
                                            style="   color: black; cursor: pointer;justify-content: center;align-items: center;text-align: center;    ">
                                            点歌
                                        </h3>
                                    </div>
                                </el-popover>

                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>未找到相关歌曲</p>
                    </div>
                </div>
            </div>

        </el-drawer>

        <!-- ---------------------------drawer2---------------- -->
        <el-drawer v-model="drawer2" :with-header="false" direction="rtl" :before-close="handleClose" :size="0">
            <Setting />
        </el-drawer>
        <!-- ---------------------------drawer2---------------- -->

        <el-drawer style=" background-color: #f0f0f0; " v-model="drawer3" :with-header="false" direction="ltr"
            :before-close="handleClose" :size="0">
            <chatHistory />
        </el-drawer>
    </div>
</template>

<style scoped>
.fakeCircle {
    width: 3.5em;
    height: 3.5em;
    margin-top: .2em;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, .32);
    position: absolute;
}

.fakeCircle1 {
    width: 3.5em;
    height: 3.5em;
    margin-top: 5em;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, .32);
    position: absolute;
}

.fakeCircle2 {
    width: 3.5em;
    height: 3.5em;
    margin-top: 9.6em;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, .32);
    position: absolute;
}

.fakeCircle3 {
    width: 3.5em;
    height: 3.5em;
    margin-top: 14.2em;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, .32);
    position: absolute;
}

@media (max-width: 768px) {
    .showTag {
        display: none;
    }
}

.all {
    display: flex;
    flex-flow: column;
    position: absolute;
    right: 0;
    bottom: 15%;
    user-select: none;
    align-items: center;
    overflow: hidden;
    z-index: 200;
}


.showTag {
    justify-content: center
}

.showTag div {
    z-index: 201;
    position: absolute;
    padding: 0.3125em 0.625em;
    border-radius: 0.25em;
    white-space: nowrap;
    /* box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2); */
    background-color: rgba(43, 40, 40, 0.7);
    text-align: center;
    transform: translateY(-50%);
}




.list {
    color: #ffffff;
    bottom: 24.5em;
    right: .6em;

    /* transform: translateY(-50%); */
}

.setting {
    color: #ffffff;
    bottom: 19.5em;
    right: 1.25em;

}

.chathistory {
    color: #ffffff;
    bottom: 15.5em;
    right: .6em;

}



.about {
    color: #ffffff;
    bottom: 10.2em;
    right: 1.25em;

}


.all .el-image {
    width: 4em;
    transition: transform 0.05s ease;
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
    display: flex;
    flex-direction: column;
    font-size: 0.875em;
    margin-top: 1.25em;
    color: #999;
}


.music-item {
    border-radius: 0.375em;

}

.ScrollDiv {
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #bac6cc #f2f3f2;
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

.message-container {
    padding: 10px;
    overflow-y: auto;
    height: 100%;
}

.message {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.avatarBoxNick {
    position: relative;
    margin-top: -.5em;
    text-align: center;
    width: 4.2em;
    /* height: 2em; */
    color: #e2dede;
    font-size: 1.4em;
    background-color: rgba(88, 94, 87, .64);
    line-height: 1.1em;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.avatarSmall {
    background-color: rgba(0, 0, 0, .25);
}

.fade2-enter-active {
    transition: all 0.1s ease-out;
}

.fade2-leave-active {
    transition: all 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade2-enter-from,
.fade2-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
