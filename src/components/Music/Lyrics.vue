<template>
    <div class="lyrics-container">
        <div class="lyrics" ref="lyrics">
            <div v-for="(line, index) in parsedLyrics" :key="index" :class="{ 'highlighted': currentIndex === index }"
                ref="lyricLines">
                {{ line.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { getMusicLyrics } from '@/api/music';
import { useMusicInfoStore } from '@/stores/MusicInfo';
const musicInfoStore = useMusicInfoStore();
// Props
const props = defineProps<{
    currentTime: number;
}>();

// Refs
const lyrics = ref<HTMLElement | null>(null);
const lyricLines = ref<(HTMLElement | null)[]>([]);

// State
const rawLyrics = ref('');

// Fetch lyrics from API
// const fetchLyrics = async () => {
//     try {
//         const response = await axios.get('/api/lyrics'); // Replace with your actual API endpoint
//         rawLyrics.value = response.data.lrc.lyric;
//     } catch (error) {
//         console.error('Failed to fetch lyrics:', error);
//     }
// };
const fetchLyrics = async () => {
    rawLyrics.value = '';
    const response = await getMusicLyrics(musicInfoStore.currentInfo.id);
    rawLyrics.value = response.lrc.lyric;
    // console.log(rawLyrics.value);
};

// Parsed lyrics
const parsedLyrics = computed(() => {
    const lines = rawLyrics.value.split('\n');
    return lines.map(line => {
        const match = line.match(/\[(\d{2}):(\d{2}).(\d{2,3})\](.*)/);
        if (match) {
            const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 1000;
            return { time, text: match[4] || ' ' };
        }
        return { time: 0, text: line };
    }).filter(line => line.text !== '' || line.time > 0);
});

// Current index
const currentIndex = computed(() => {
    return parsedLyrics.value.findIndex(line => line.time > props.currentTime) - 1;
});
watch(() => musicInfoStore.currentInfo.id, fetchLyrics)

// Watch currentTime and scroll lyrics
watch(
    () => props.currentTime,
    (newTime) => {
        if (lyrics.value && currentIndex.value >= 0 && lyricLines.value[currentIndex.value]) {
            // 获取当前高亮歌词的行号
            const currentLineIndex = currentIndex.value;

            // 计算向上移动的距离
            const singleLineHeight = lyrics.value.clientHeight / parsedLyrics.value.length; // 假设每行歌词高度相同
            const offset = currentLineIndex * singleLineHeight;

            // 设置 lyrics 的 transform 属性
            lyrics.value.style.transform = `translateY(-${offset}px)`;
        }
    }
);
</script>
<style scoped>
.lyrics-container {

    font-size: 1.3em;
    font-weight: bolder;
    line-height: 2em;
    text-align: center;
    height: 40vh;
    width: 50vh;
    display: inline-block;
    overflow-y: hidden;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;

}

.lyrics {
    position: absolute;
    width: 100%;
    transition: transform 0.5s ease;
}

.lyrics div {
    padding: 5px;
    opacity: 0.5;
    transition: opacity 0.5s ease;
}

.lyrics div.highlighted {
    opacity: 1;
    font-weight: bold;

}
</style>
