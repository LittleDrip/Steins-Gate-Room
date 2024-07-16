import request from "@/utils/request";

// 石头门 327707910
export const getMusicList = () => {
    return request.get("/playlist/track/all?id=327707910&limit=10&offset=0");

}
export const getMusicDetail = (id: any) => {
    return request.get(`/song/url/v1?id=${id}&level=standard`);
}
export const getMoreMusicDetail = (ids: number[]) => {
    const idParam = ids.join(',');
    // console.log(`/song/url/v1?id=${ids}&level=higher`);
    return request.get(`/song/url/v1?id=${idParam}&level=higher`);
}



