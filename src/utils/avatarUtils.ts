// src/utils/avatarUtils.ts
// export const avatars = [
//     'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbd2.jpg',
//     'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cb70.jpg',
//     'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbb0.jpg',
//     'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbb7.jpg',
//     'https://pic.imgdb.cn/item/66ae245ad9c307b7e9e246de.jpg',
//     'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e489aa.jpg',
//     'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e2036f.jpg',
//     'https://pic.imgdb.cn/item/66ae245ad9c307b7e9e246d4.jpg',
//     'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e48997.jpg',
//     'https://pic.imgdb.cn/item/66ae261fd9c307b7e9e48985.jpg',
//     'https://pic.imgdb.cn/item/66ae261fd9c307b7e9e4896d.jpg',
//     'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e628cd.jpg',
//     'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e6283f.jpg',
//     'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e6285c.jpg',
//     'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e62869.jpg',
//     'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e20379.jpg',
//     'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e2038e.jpg',
//     'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e203a4.jpg',
//     'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e203b6.jpg',
//     'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e4899d.jpg'
// ];


// https://pic.imgdb.cn/item/66b1f6c5d9c307b7e9bca29a.jpg 我的头像

export const avatars = [
    'https://pic.imgdb.cn/item/66b1f223d9c307b7e9b259da.jpg',
    'https://pic.imgdb.cn/item/66b1f223d9c307b7e9b259e2.jpg',
    'https://pic.imgdb.cn/item/66b1f223d9c307b7e9b259f3.jpg',
    'https://pic.imgdb.cn/item/66b1f222d9c307b7e9b259aa.jpg',
    'https://pic.imgdb.cn/item/66b1f223d9c307b7e9b259ba.jpg',
    'https://pic.imgdb.cn/item/66b1f2a4d9c307b7e9b32fcd.jpg',
    'https://pic.imgdb.cn/item/66ae245ad9c307b7e9e246d4.jpg',
    'https://pic.imgdb.cn/item/66b1f350d9c307b7e9b47476.jpg',
    'https://pic.imgdb.cn/item/66b1f2a4d9c307b7e9b32fde.jpg',
    'https://pic.imgdb.cn/item/66b1f350d9c307b7e9b47482.jpg',
    'https://pic.imgdb.cn/item/66b1f2cfd9c307b7e9b38551.jpg',
    'https://pic.imgdb.cn/item/66b1f2a4d9c307b7e9b32fb9.jpg',
    'https://pic.imgdb.cn/item/66b1f350d9c307b7e9b47402.jpg',
    'https://pic.imgdb.cn/item/66b1f2d0d9c307b7e9b385c1.jpg',
    'https://pic.imgdb.cn/item/66b1f2d0d9c307b7e9b38595.jpg',
    'https://pic.imgdb.cn/item/66b1f2a4d9c307b7e9b32fe5.jpg',
    'https://pic.imgdb.cn/item/66b1f2d0d9c307b7e9b385d5.jpg',
    'https://pic.imgdb.cn/item/66b1f2cfd9c307b7e9b38536.jpg',
    'https://pic.imgdb.cn/item/66b1f306d9c307b7e9b3ec93.jpg',
    'https://pic.imgdb.cn/item/66b1f350d9c307b7e9b47431.jpg',
    'https://pic.imgdb.cn/item/66b1f366d9c307b7e9b4a9cd.jpg',
    'https://pic.imgdb.cn/item/66b1f306d9c307b7e9b3ec53.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e2036f.jpg',
    'https://pic.imgdb.cn/item/66b1f2a4d9c307b7e9b32fd6.jpg',
    'https://pic.imgdb.cn/item/66b1f600d9c307b7e9baf071.jpg',

];
export function getAvatarUrlById(avatarId: number): string {
    return avatars[avatarId];
}
