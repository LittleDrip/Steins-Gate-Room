const roomBgs = [
    'https://s21.ax1x.com/2024/05/03/pkkhOCd.jpg',
    'https://pic.imgdb.cn/item/66ae2a3ad9c307b7e9ea34bd.jpg',
    'https://pic.imgdb.cn/item/66ae2a3ad9c307b7e9ea3564.jpg',
    'https://pic.imgdb.cn/item/66ae2a3bd9c307b7e9ea3694.jpg',
    'https://pic.imgdb.cn/item/66ae2a3bd9c307b7e9ea37ac.jpg',
    'https://pic.imgdb.cn/item/66af04d1d9c307b7e90d751b.png',
    'https://pic.imgdb.cn/item/66ae2a3bd9c307b7e9ea3898.png',
    'https://pic.imgdb.cn/item/66ae2a39d9c307b7e9ea3300.jpg',
    'https://pic.imgdb.cn/item/66ae2a3ad9c307b7e9ea33be.png',
    'https://pic.imgdb.cn/item/66ae2ac3d9c307b7e9ebe11d.jpg',
    'https://pic.imgdb.cn/item/66ae2ac3d9c307b7e9ebe186.jpg',
]

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
//  return new URL(`@/assets/img/bg/t3.jpg`, import.meta.url).href
export const getAssetsFile = (id: any) => {
    if (id == 1) {
        return roomBgs[0];
    } else if (id == 2) {
        return roomBgs[1];
    } else if (id == 3) {
        return roomBgs[2]
    } else if (id == 4) {
        return roomBgs[3]
    } else if (id == 5) {
        return roomBgs[4]
    } else if (id == 6) {
        return roomBgs[5]
    }
}