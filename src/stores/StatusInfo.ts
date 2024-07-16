import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusInfo = defineStore('statusInfo', () => {
    let currentSongIndex = ref()
    function setSongIndex(newInfo: any) {
        currentSongIndex.value = newInfo;
    }
    return { currentSongIndex, setSongIndex }
})
