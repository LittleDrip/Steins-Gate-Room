<template>
    <el-button plain @click="centerDialogVisible = true">
        Click to open the Dialog
    </el-button>
    <div>
        <el-dialog class="dialog" v-model="centerDialogVisible" center title="Warning" width="500" align-center>
            <img style="width: 10em;margin-left: 10em;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const centerDialogVisible = ref(false)

</script>

<style setup lang="css">
.dialog {
    position: absolute;
}
</style>
