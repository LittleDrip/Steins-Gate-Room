import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const roomUsers = ref<{ [key: string]: any[] }>({});
    const totalCount = ref(0);
    const setRoomUsers = (newroomUsers: any) => {
        roomUsers.value = newroomUsers;
    }
    const setTotalCount = (newCount: any) => {
        totalCount.value = newCount;
    }
    return { roomUsers, setRoomUsers, totalCount, setTotalCount };
});
