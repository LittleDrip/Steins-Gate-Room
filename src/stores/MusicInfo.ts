import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMusicInfoStore = defineStore('musicInfo', () => {

    let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "" }]);
    let MusicURL: any = ref([{ id: "", url: "", time: "" }]);
    let currentInfo: any = ref({
        name: "", picUrl: "", author: "", url: "", time: ""
    })
    function setListInfo(newInfo: any) {
        ListInfo.value = newInfo;
    }
    function setMusicInfo(newInfo2: any) {
        MusicURL.value = newInfo2;
    }
    function setCurrentInfo(newInfo: any) {
        currentInfo.value = newInfo;
    }
    function getCurrentInfo() {
        return currentInfo.value;
    }

    function removeAll() {
        ListInfo.value = {};
        MusicURL.value = {};
    }
    return { ListInfo, MusicURL, currentInfo, setListInfo, setMusicInfo, removeAll, setCurrentInfo, getCurrentInfo }
})
