<script lang="ts" setup>
// import { getCookie } from '@/utils/login';
import Login from '@/components/Login/login.vue';
import { ref } from 'vue';
const showLogin = ref(true);
const onLoginSuccess = () => {
    showLogin.value = false;
};
// let cookie = getCookie();
</script>

<template>

    <div style="width: 100vw;height: 100vh;overflow-y: hidden;">
        <Transition name="fade">
            <Login style="position: absolute;" v-if="showLogin" @loginSuccess="onLoginSuccess" />
        </Transition>
        <!-- {{ cookie }} -->
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
        12312312312312
        <br>
        2131231231231
        <br>
    </div>
</template>

<style scoped>
/* 应用于嵌套元素的规则 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>