import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrentMessageStore = defineStore('currentMessage', () => {
    // 存储每个房间的消息
    const messagesByRoom = ref(new Map<string, Map<string, { expiry: number, msg: string }>>());
    const audioCount = ref(0);
    function setCurrentMessage(roomId: string, name: string, msg: string) {
        audioCount.value++;
        const roomMessages = messagesByRoom.value.get(roomId) || new Map();

        // 设置消息的过期时间为当前时间 + 10秒
        const expiry = Date.now() + 10000;

        // 保存消息内容和它的过期时间
        roomMessages.set(name, { expiry, msg });
        messagesByRoom.value.set(roomId, roomMessages);

        // 启动一个定时器在10秒后清除过期消息
        setTimeout(() => {
            const currentMessages = messagesByRoom.value.get(roomId);
            if (currentMessages) {
                const message = currentMessages.get(name);
                if (message && Date.now() >= message.expiry) {
                    currentMessages.delete(name);
                    if (currentMessages.size === 0) {
                        messagesByRoom.value.delete(roomId); // 如果房间中的消息全部清除，也从 messagesByRoom 中删除
                    }
                }
            }
        }, 10000); // 10秒后检查并清除消息
    }

    function clearMessagesForRoom(roomId: string) {
        messagesByRoom.value.delete(roomId);
    }

    return { audioCount, messagesByRoom, setCurrentMessage, clearMessagesForRoom };
});
