import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {

    // 信息列表
    let messages = ref([]);



    function setMessages(newMessages: any) {
        messages.value = newMessages;
    }

    return { messages, setMessages };
});
