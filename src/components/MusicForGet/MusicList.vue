<script lang="ts" setup>
import { getMusicList } from "@/api/music";
import { getMusicDetail, getMoreMusicDetail } from "@/api/music";
import { onMounted, reactive, ref } from "vue";
import { useMusicInfoStore } from "@/stores/MusicInfo";
const musicStore = useMusicInfoStore();
let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "" }]);
let MusicURL: any = ref([{ id: "", url: "", time: "" }]);
let ids: any = null;
const findMusicUrlsByIds = async (ids: any) => {
  // 遍历需要查找的 id
  try {
    const res = await getMoreMusicDetail(ids);
    const URLInfo = res.data.map((song: any) => ({
      id: song.id,
      url: song.url,
      time: song.time,
    }));
    MusicURL.value = URLInfo;
    // console.log(res.data);
  } catch (error) {
    console.error("获取音乐 URL 失败:", error);
  }
};
const getList = async () => {
  let res: any = await getMusicList();
  const songInfo = res.songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    author: song.ar[0].name, // 假设作者信息在 ar[0] 中
  }));
  ListInfo.value = songInfo; // 将处理后的数据赋值给 ref
  ids = ListInfo.value.map((item: any) => item.id); // 使用 map 方法提取所有 idconsole.log(ids);
  // console.log(ids);
};

const handleMusic = async () => {
  await getList();
  await findMusicUrlsByIds(ids);
};
onMounted(async () => {
  await handleMusic();
  musicStore.setListInfo(ListInfo.value);
  musicStore.setMusicInfo(MusicURL.value);
});
</script>

<template>
  <div>
    <!-- <el-button type="primaty" @click="handleMusic()"></el-button>
    {{ ListInfo }}
    {{ MusicURL }} -->
  </div>
</template>

<style scoped></style>
