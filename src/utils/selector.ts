export function updateRoom(id: any) {
    if (id == 1) {
        return "未来道具研究所"
    } else if (id == 2) {
        return "SERN研究所"
    } else if (id == 3) {
        return "电器街"
    } else if (id == 4) {
        return "女仆咖啡厅"
    } else if (id == 5) {
        return "轻音乐专区"
    } else if (id == 6) {
        return "流行歌杂烩"
    }
}

// 获取assets静态资源
export const getAssetsFile = (id: any) => {
    if (id == 1) {
        return new URL(`@/assets/img/bg/Steins4 .jpg`, import.meta.url).href
    } else if (id == 2) {
        return new URL(`@/assets/img/bg/Steins1.jpg`, import.meta.url).href
    } else if (id == 3) {
        return new URL(`@/assets/img/bg/Steins1.jpg`, import.meta.url).href
    } else if (id == 4) {
        return new URL(`@/assets/img/bg/Steins1.jpg`, import.meta.url).href
    } else if (id == 5) {
        return new URL(`@/assets/img/bg/Steins1.jpg`, import.meta.url).href
    } else if (id == 6) {
        return new URL(`@/assets/img/bg/Steins1.jpg`, import.meta.url).href
    }
}