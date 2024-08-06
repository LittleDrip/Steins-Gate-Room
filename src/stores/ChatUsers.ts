import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatUsersStore = defineStore('chatuser', () => {
    // 用户列表
    let userList = ref([]);

    // 用户数量
    let userCount = ref(0);

    function setUserList(newUserList: any) {
        userList.value = newUserList;
    }
    function setUserCount(newUserConut: any) {
        userCount.value = newUserConut;
    }
    return { userCount, userList, setUserList, setUserCount };
});
