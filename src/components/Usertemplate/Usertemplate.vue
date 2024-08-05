<script lang="ts" setup>
interface User {
    id: number;
    avatarSrc: string;
}

const users: User[] = [
    { id: 1, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/46.jpg" },
    { id: 2, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/45.jpg" },
    { id: 3, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/43.jpg" },
    { id: 4, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/42.jpg" },
    { id: 5, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/41.jpg" },
    { id: 6, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/40.jpg" },
    // Add the remaining users
    // { id: 7, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/39.jpg" },
    // { id: 8, avatarSrc: "https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/38.jpg" }
];
</script>

<template>
    <div class="UserAvatarList">
        <div class="UserContainer1">
            <div v-for="(user, index) in users.slice(0, 2)" :key="user.id"
                :class="{ 'AvatarDiv1': index === 1, 'AvatarDiv': index === 0 }">
                <img :src="user.avatarSrc" :alt="`User ${user.id}`">
            </div>
        </div>
        <div class="UserContainer2">
            <div v-for="user in users.slice(2, 8)" :key="user.id" class="AvatarDivBottom">
                <img :src="user.avatarSrc" :alt="`User ${user.id}`">
            </div>
        </div>
    </div>
</template>

<style scoped>
.UserAvatarList {
    position: relative;
    display: flex;
    justify-content: center;
}

.UserContainer1 {
    position: absolute;
    display: flex;
    margin-top: 10em;
    /* justify-content: center; */
    /* align-items: center; */
}

.UserContainer2 {
    position: absolute;
    display: flex;
    margin-top: 25em;
    /* justify-content: center; */
    /* align-items: center; */
}

.AvatarDiv img {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    margin-right: 8em;
}

.AvatarDiv1 img {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    /* margin-top: 12em; */
    margin-left: 8em;
}

.AvatarDivBottom img {
    width: 5em;
    height: 5em;
    border-radius: 50%;
    margin-right: 1.6em;
}
</style>
