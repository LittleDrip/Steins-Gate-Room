<script lang="ts" setup>

</script>

<template>
    <div class="UserAvatarList">
        <div class="UserContainer">
            <div class="AvatarDiv">
                <img src="https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/46.jpg" alt="">
            </div>
            <div class="AvatarDiv1">
                <img src="https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/45.jpg" alt="">
            </div>
            <div class="AvatarDiv2">
                <img src="https://nichijou-1300531302.cos.ap-guangzhou.myqcloud.com/avatar/46.jpg" alt="">
            </div>
        </div>
    </div>

</template>

<style scoped>
.UserAvatarList {
    position: relative;

}

.UserContainer {
    position: absolute;
    display: flex;
}

.AvatarDiv img {
    width: 10em;
    height: 10em;
    border-radius: 50%;
}

.AvatarDiv1 img {
    width: 10em;
    height: 10em;
    border-radius: 50%;
}

.AvatarDiv2 img {
    width: 10em;
    height: 10em;
    border-radius: 50%;
}
</style>