// stores/volume.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVolumeStore = defineStore('volume', () => {
    const volume = ref(40); // 初始音量
    const openLyrics = ref(true);
    const openNotice = ref(true);
    function setVolume(newVolume: any) {
        volume.value = newVolume;
    }
    function setopenLyrics(newValue: any) {
        openLyrics.value = newValue;
    }
    return {
        volume,
        openNotice,
        openLyrics,
        setVolume,
        setopenLyrics
    };
}, { persist: true });
