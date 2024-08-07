import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {

    // 信息列表
    let messages: any = ref({});


    function addMessage(roomId: any, newMessage: any) {
        if (!messages.value[roomId]) {
            messages.value[roomId] = [];
        }
        messages.value[roomId].push(newMessage);
    }
    function clearMessagesForRoom() {
        if (messages.value) {
            messages.value = {};
        }
    }
    function getMessages(roomId: any) {
        return messages.value[roomId] || [];
    }

    return { messages, addMessage, getMessages, clearMessagesForRoom };
});
