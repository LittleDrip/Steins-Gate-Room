// src/utils/avatarUtils.ts
export const avatars = [
    'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbd2.jpg',
    'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cb70.jpg',
    'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbb0.jpg',
    'https://pic.imgdb.cn/item/66ae2665d9c307b7e9e4cbb7.jpg',
    'https://pic.imgdb.cn/item/66ae245ad9c307b7e9e246de.jpg',
    'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e489aa.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e2036f.jpg',
    'https://pic.imgdb.cn/item/66ae245ad9c307b7e9e246d4.jpg',
    'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e48997.jpg',
    'https://pic.imgdb.cn/item/66ae261fd9c307b7e9e48985.jpg',
    'https://pic.imgdb.cn/item/66ae261fd9c307b7e9e4896d.jpg',
    'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e628cd.jpg',
    'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e6283f.jpg',
    'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e6285c.jpg',
    'https://pic.imgdb.cn/item/66ae2776d9c307b7e9e62869.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e20379.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e2038e.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e203a4.jpg',
    'https://pic.imgdb.cn/item/66ae2416d9c307b7e9e203b6.jpg',
    'https://pic.imgdb.cn/item/66ae2620d9c307b7e9e4899d.jpg'
];

export function getAvatarUrlById(avatarId: number): string {
    return avatars[avatarId];
}
