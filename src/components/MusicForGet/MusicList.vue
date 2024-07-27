<script lang="ts" setup>
import { getMoreMusicDetail, getMusicList } from "@/api/music";
import { getMusicDetail } from "@/api/music";
import { onMounted, ref } from "vue";
import { useMusicInfoStore } from "@/stores/MusicInfo";
import { useRoute } from "vue-router";
const musicStore = useMusicInfoStore();
const route = useRoute();

let ListInfo: any = ref([{ id: "", name: "", picUrl: "", author: "", url: "" }]);
let ids: any = null;


const getList = async () => {
  let res: any = await getMusicList(route.query.id);
  const songInfo = res.songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    author: song.ar[0].name, // 假设作者信息在 ar[0] 中
    time: song.dt,
    url: "" // 初始值为空
  }));
  ids = songInfo.map((item: any) => item.id); // 使用 map 方法提取所有 idconsole.log(ids);
  console.log(ids);
  const res2 = await getMoreMusicDetail(ids);

  // 使用 Promise.all 来并行获取每首歌的 URL
  const songInfoWithUrl = await Promise.all(
    songInfo.map(async (song: any, index: number) => {
      return { ...song, url: res2.data[index].url };
    })
  );

  ListInfo.value = songInfoWithUrl; // 将处理后的数据赋值给 ref
  if (ListInfo.value.length > 0) {
    musicStore.setCurrentInfo(ListInfo.value[0]); //第一个歌曲为当前歌曲
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
