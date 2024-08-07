// components/VolumeControl.vue
<template>
    <div class="allcontent">
        <p style="text-align: center;margin-bottom: 0em;font-size: 1.5em;">设 置</p>
        <el-divider direction="horizontal" content-position="center"></el-divider>
        <div class="settingItem">
            <div class="slider-demo-block">
                <span class="demonstration">歌曲音量：</span>
                <el-slider class="slider" v-model="volume" :step="10" @input="updateVolume" />
            </div>
            <div class="LyricsSetting">
                <span style="font-size: 1.3em;padding-right: 0;">开启歌词：</span>
                <el-switch style="--el-switch-on-color: pink;transform: translateY(-.2em);" size="large"
                    v-model="openLyrics" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useVolumeStore } from '@/stores/volume';
const openLyrics = ref(false);
const toolsStore = useVolumeStore();
const volume = computed({
    get: () => toolsStore.volume,
    set: (value) => toolsStore.setVolume(value)
});
watch(openLyrics, (newValue) => {
    toolsStore.setopenLyrics(newValue);
    console.log(newValue);
})
const updateVolume = (value) => {
    toolsStore.setVolume(value);
};
</script>

<style setup>
.allcontent {
    width: 22em;

}

.settingItem {
    display: flex;
    flex-direction: column;
}

.slider-demo-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 22em;
}

.demonstration {
    font-size: 1.2em;
    margin-bottom: 0.5em;
}

.LyricsSetting {
    margin-top: 2em;

}

.slider {
    width: 100%;
    margin-top: 0.2em;
}

.el-slider__button {
    background-color: #ffc7c7;
    border: 2px solid #ffc7c7
        /* 将滑块按钮的背景颜色更改为红色 */
}

.el-slider__bar {
    background-color: #ffc7c7
}
</style>
