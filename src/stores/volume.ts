// stores/volume.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVolumeStore = defineStore('volume', () => {
    const volume = ref(50); // 初始音量

    function setVolume(newVolume: any) {
        volume.value = newVolume;
    }

    return {
        volume,
        setVolume
    };
});
