import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrentMessageStore = defineStore('currentMessage', () => {
    const currentMessages = ref(new Map<string, { time: number, msg: string, timeoutId: ReturnType<typeof setTimeout> }>());

    function setCurrentMessage(name: string, time: number, msg: string) {
        // 如果当前用户已有消息，则取消其现有的定时器
        const existingMessage = currentMessages.value.get(name);
        if (existingMessage) {
            clearTimeout(existingMessage.timeoutId);
        }

        // 设置新的消息并记录定时器 ID
        const timeoutId = setTimeout(() => {
            currentMessages.value.delete(name);
        }, 10000); // 10秒后清除消息

        currentMessages.value.set(name, { time, msg, timeoutId });
    }

    return { currentMessages, setCurrentMessage };
});
