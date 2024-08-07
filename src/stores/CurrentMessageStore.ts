import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrentMessageStore = defineStore('currentMessage', () => {
    // 存储每个房间的消息
    const messagesByRoom = ref(new Map<string, Map<string, { time: number, msg: string, timeoutId: ReturnType<typeof setTimeout> }>>());
    const audioCount = ref(0);

    function setCurrentMessage(roomId: string, name: string, time: number, msg: string) {
        audioCount.value++;
        const roomMessages = messagesByRoom.value.get(roomId) || new Map();
        // 清除之前可能存在的定时器
        const existingMessage = roomMessages.get(name);
        if (existingMessage) {
            clearTimeout(existingMessage.timeoutId);
        }

        // 设置新的消息并记录定时器 ID
        const timeoutId = setTimeout(() => {
            roomMessages.delete(name);
            if (roomMessages.size === 0) {
                messagesByRoom.value.delete(roomId); // 如果房间中的消息全部清除，也从 messagesByRoom 中删除
            }
        }, 10000); // 10秒后清除消息

        roomMessages.set(name, { time, msg, timeoutId });
        messagesByRoom.value.set(roomId, roomMessages);
    }

    function clearMessagesForRoom(roomId: string) {
        const roomMessages = messagesByRoom.value.get(roomId);
        if (roomMessages) {
            roomMessages.forEach(({ timeoutId }) => clearTimeout(timeoutId));
            messagesByRoom.value.delete(roomId);
        }
    }

    return { messagesByRoom, setCurrentMessage, clearMessagesForRoom, audioCount };
});
