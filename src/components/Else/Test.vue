<script lang="ts" setup>
import { getCookie } from '@/utils/login';
let cookie = getCookie();
</script>

<template>
    <div>
        {{ cookie }}
    </div>
</template>

<style scoped></style>