import request from "@/utils/request.ts";

export const getMusicList = () => {
    return request.get("/playlist/track/all?id=60530487&limit=10&offset=1");

}
export const getMusicDetail = (id: any) => {
    return request.get(`/song/url/v1?id=${id}&level=standard`);
}
export const getMoreMusicDetail = (ids: number[]) => {
    const idParam = ids.join(',');
    // console.log(`/song/url/v1?id=${ids}&level=standard`);
    return request.get(`/song/url/v1?id=${idParam}&level=standard`);
}
