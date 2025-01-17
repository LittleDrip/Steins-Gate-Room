<script lang="ts" setup>
import { getMoreMusicDetail, getMusicList } from "@/api/music";
import { getMusicDetail } from "@/api/music";
import { onMounted, ref } from "vue";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import { useRoute } from "vue-router";
import { cacheMusicList, getCachedMusicList } from "@/api/userlist";
const musicStore = useMusicInfoStore();
const route = useRoute();

let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "", url: "" }]);
let ids: any = null;


const getList = async () => {
  try {
    // 先尝试从缓存获取
    const cachedList = await getCachedMusicList(route.query.id);
    if (cachedList) {

      ListInfo.value = cachedList;
      if (ListInfo.value.length > 0) {
        musicStore.setCurrentInfo(ListInfo.value[0]);
      }
      return;
    }
  } catch (error) {
    console.log(error);
  }

  // 缓存不存在,从网易云获取
  let res: any = await getMusicList(route.query.id);
  const songInfo = res.songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    author: song.ar[0].name,
    time: song.dt,
    url: ""
  }));

  ids = songInfo.map((item: any) => item.id);
  const res2 = await getMoreMusicDetail(ids);

  const songInfoWithUrl = await Promise.all(
    songInfo.map(async (song: any, index: number) => {
      return { ...song, url: res2.data[index].url };
    })
  );

  ListInfo.value = songInfoWithUrl;
  try {
    // 缓存到后端
    await cacheMusicList(route.query.id, songInfoWithUrl);
  } catch (error) {
    console.error('缓存保存失败:', error);
  }

  if (ListInfo.value.length > 0) {
    musicStore.setCurrentInfo(ListInfo.value[0]);
  }

};

const handleMusic = async () => {
  await getList();
};
onMounted(async () => {
  await handleMusic();
  musicStore.setListInfo(ListInfo.value);
});
</script>

<template></template>

<style scoped></style>
