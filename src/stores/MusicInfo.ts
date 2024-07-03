import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMusicInfoStore = defineStore('musicInfo', () => {

    let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "" }]);
    let MusicURL: any = ref([{ id: "", url: "", time: "" }]);
    function setListInfo(newInfo: any) {
        ListInfo.value = newInfo;
    }
    function setMusicInfo(newInfo2: any) {
        MusicURL.value = newInfo2;
    }
    function removeAll() {
        ListInfo.value = {};
        MusicURL.value = {};
    }
    return { ListInfo, MusicURL, setListInfo, setMusicInfo, removeAll }
})