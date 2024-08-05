<script lang="ts" setup>
import { getUserListService } from '@/api/userlist';
import { getAvatarUrlById } from '@/utils/avatarUtils';
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/roomUsers';
const userStore = useUserStore();
const roomUsers = ref<{ [key: string]: any[] }>({});
const totalUsers = ref<{ username: string; avatar: string }[]>([]);

// const roomUsers = ref<{ [key: string]: any[] }>({
//     '1': [
//         { username: 'drip', avatar: '1', room: '1' }, { username: 'luffy', avatar: '10', room: '1' }
//     ],
//     '3': [{ username: '牧濑红莉栖', avatar: '2', room: '2' }],
//     '7': [{ username: '游客226', avatar: '3', room: '2' }],
//     '10': [{ username: 'phone', avatar: '5', room: '4' }]
// });
const getRoomsUser = async () => {
    let res = await getUserListService();
    roomUsers.value = res;
    updateTotalUsers();
    // console.log(roomUsers.value);
}
watch(roomUsers, () => {
    userStore.setRoomUsers(roomUsers.value);
    userStore.setTotalCount(totalUsers.value.length)
}, { immediate: true })
const updateTotalUsers = () => {
    const users: { username: string; avatar: string }[] = [];
    for (const room in roomUsers.value) {
        users.push(...roomUsers.value[room]);
    }
    totalUsers.value = users;
};
onMounted(() => {
    getRoomsUser();
})
</script>

<template>
    <div class="headUser">
        <div class="Usercontent">
            <ul style="display: flex;">
                <li v-for="user in totalUsers" :key="user.username"
                    style="display: flex;flex-direction: column;margin-right: .5em;">
                    <div><img class="userPortalAvatar" :src="getAvatarUrlById(user.avatar)" alt=""></div>
                    <div class="avatarBoxNick avatarSmall">{{ user.username }} </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- <div v-for="(item, key) in roomUsers['1']">
        {{ item.username }}
    </div> -->

</template>

<style scoped>
.headUser {
    top: 0;
    left: 12em;
    position: relative;
    z-index: 101;
}

.Usercontent {
    position: relative;
    display: inline-block;
    text-align: center;

}


.userPortalAvatar {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
}

.avatarBoxNick {
    position: absolute;
    top: 3em;
    margin-top: -.5em;
    backdrop-filter: blur(8px);
    width: 3em;
    height: 1.2em;
    color: #e2dede;
    font-size: .8em;
    background-color: rgba(88, 94, 87, .64);
    line-height: 1.1em;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.avatarSmall {
    background-color: rgba(0, 0, 0, .25);
}
</style>