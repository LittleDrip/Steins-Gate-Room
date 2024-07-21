import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusInfo = defineStore('statusInfo', () => {
    let currentSongIndex = ref(0)
    function setSongIndex(newInfo: any) {
        currentSongIndex.value = newInfo;
    }
    function getSongIndex() {
        return currentSongIndex.value;
    }
    return { currentSongIndex, setSongIndex, getSongIndex }
})
