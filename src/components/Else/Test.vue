<script setup>
import dish from "@/assets/img/dish1.png";
import pole from "@/assets/img/pole.png";
import Play from "@/components/Music/Play.vue";
import Aside from '@/components/Aside/aside.vue';
</script>

<template>
    <div>
        <div class="middle">
            <img @dragstart.prevent :src="pole" class="pole" style="width: 14em;" />
            <img style="width: 10em;height: 10em; border-radius: 50%;" class="dish_avat"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            <img style="width: 10em;" @dragstart.prevent :src="dish" alt="" />
        </div>
    </div>
</template>

<style scoped>
.middle {
    position: relative;
    margin-top: 10em;
    /* 父容器样式 */
}

.middle img {

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* 绝对定位元素样式 */

}
</style>