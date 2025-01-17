import request from "@/utils/requestWs";

export const getUserListService = () => {
    return request.get('/list/rooms');
}// 获取缓存的播放列表
export const getCachedMusicList = (roomId: any) => {
    return request.get(`/music/cache/${roomId}`);
}

// 缓存播放列表
export const cacheMusicList = (roomId: any, musicList: any[]) => {
    return request.post(`/music/cache/${roomId}`, musicList);
}
