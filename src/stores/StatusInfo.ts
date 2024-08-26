import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusInfo = defineStore('statusInfo', () => {
    let currentSongIndex = ref(0);
    let NewCountIfPersonIn = ref(0);
    let currentSongTime = ref(0);
    let tabSong = ref(0);
    function setSongIndex(newInfo: any) {
        currentSongIndex.value = newInfo;
    }
    function setcurrentSongTime(newInfo: any) {
        currentSongTime.value = newInfo;
    }
    function getSongIndex() {
        return currentSongIndex.value;
    }
    function addCount() {
        NewCountIfPersonIn.value++;
    }
    function changeSongIndex() {
        tabSong.value++;
    }
    return { tabSong, changeSongIndex, currentSongTime, currentSongIndex, setSongIndex, getSongIndex, addCount, NewCountIfPersonIn, setcurrentSongTime }
})
