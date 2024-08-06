import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const roomUsers = ref<{ [key: string]: any[] }>({});
    const totalUsers = ref<{ username: string; avatar: string }[]>([]);
    const totalCount = ref(0);
    const setRoomUsers = (newroomUsers: any) => {
        roomUsers.value = newroomUsers;
    }
    const setTotalCount = (newCount: any) => {
        totalCount.value = newCount;
    }
    const setTotalUsers = (newTotalUsers: any) => {
        totalUsers.value = newTotalUsers;
    }
    return { roomUsers, totalUsers, setRoomUsers, totalCount, setTotalCount, setTotalUsers };
});
