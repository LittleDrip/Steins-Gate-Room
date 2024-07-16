import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMusicInfoStore = defineStore('musicInfo', () => {

    let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "", time: "", url: "" }]);
    let currentInfo: any = ref({
        name: "", picUrl: "", author: "", url: "", time: ""
    })
    function setListInfo(newInfo: any) {
        ListInfo.value = newInfo;
    }

    function setCurrentInfo(newInfo: any) {
        currentInfo.value = newInfo;
    }
    function getCurrentInfo() {
        return currentInfo.value;
    }

    function removeAll() {
        ListInfo.value = {};
    }
    return { ListInfo, currentInfo, setListInfo, removeAll, setCurrentInfo, getCurrentInfo }
})
