const roomBgs = [
    'https://pic.imgdb.cn/item/66b39447d9c307b7e99b1f15.jpg',
    'https://pic.imgdb.cn/item/66b3903ad9c307b7e9930421.jpg',
    'https://pic.imgdb.cn/item/66b3903ad9c307b7e993046b.jpg',
    'https://pic.imgdb.cn/item/66b3aae3d9c307b7e9d471a8.jpg',
    'https://pic.imgdb.cn/item/66b3903ad9c307b7e99304b6.jpg',
    'https://pic.imgdb.cn/item/66b397f6d9c307b7e9a29370.jpg',
    'https://pic.imgdb.cn/item/66b39087d9c307b7e9939498.jpg',
    'https://pic.imgdb.cn/item/66b3a9d5d9c307b7e9d11da7.jpg',
    'https://pic.imgdb.cn/item/66b39084d9c307b7e99391bc.jpg',
    'https://pic.imgdb.cn/item/66b3ac93d9c307b7e9d60046.jpg',
    'https://pic.imgdb.cn/item/66b3abe6d9c307b7e9d577c7.jpg',
    'https://pic.imgdb.cn/item/66b3918dd9c307b7e9957797.jpg' //default
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
        return "β世界线"
    } else if (id == 6) {
        return "显像管工房"
    } else if (id == 7) {
        return "轻音乐专区"
    } else if (id == 8) {
        return "流行歌分享"
    } else if (id == 9) {
        return "欧美专区"
    } else if (id == 10) {
        return "粤语经典"
    } else if (id == 11) {
        return "国风民谣"
    } else if (id == 12) {
        return "杂烩属性大爆发"
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
    } else if (id == 7) {
        return roomBgs[6];
    } else if (id == 8) {
        return roomBgs[7]
    } else if (id == 9) {
        return roomBgs[8]
    } else if (id == 10) {
        return roomBgs[9]
    } else if (id == 11) {
        return roomBgs[10]
    } else if (id == 12) {
        return roomBgs[11]
    }
}