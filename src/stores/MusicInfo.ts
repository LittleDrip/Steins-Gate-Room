import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMusicInfoStore = defineStore('musicInfo', () => {

    let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "", time: "", url: "" }]);
    let RequestList: any = ref([]);
    let currentInfo: any = ref({
        id: "", name: "", picUrl: "", author: "", url: "", time: ""
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
        ListInfo.value = [{ id: "", name: "", picUrl: "", author: "", time: "", url: "" }];
        RequestList.value = [];
        currentInfo.value = {
            name: "", picUrl: "", author: "", url: "", time: ""
        };
    }

    function addSongToList(song: any) {
        ListInfo.value.push(song);
    }

    function addSongToRequestList(song: any) {
        RequestList.value.push(song);
    }

    function removeFirstFromRequestList() {
        if (RequestList.value.length > 0) {
            return RequestList.value.shift();
        }
        return null;
    }

    function getFirstFromRequestList() {
        if (RequestList.value.length > 0) {
            return RequestList.value[0];
        }
        return null;
    }

    function isRequestListEmpty() {
        return RequestList.value.length === 0;
    }

    return {
        ListInfo,
        RequestList,
        currentInfo,
        setListInfo,
        removeAll,
        setCurrentInfo,
        getCurrentInfo,
        addSongToList,
        addSongToRequestList,
        removeFirstFromRequestList,
        getFirstFromRequestList,
        isRequestListEmpty
    }
})
