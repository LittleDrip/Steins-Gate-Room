import request from "@/utils/request";
import { getCookie } from '@/utils/login';
let cookie = getCookie();

// 石头门 327707910
export const getMusicList = (id: any) => {
    if (id == 1) {
        return request.get("/playlist/track/all?id=327707910&limit=50&offset=0");
    } else if (id == 2) {
        return request.get("/playlist/track/all?id=2133251288&limit=50&offset=0");
    }
    else if (id == 3) {
        // 日语分享
        return request.get("/playlist/track/all?id=2223469560&limit=50&offset=0");
    }

}
export const getMusicDetail = (id: any) => {
    return request.get(`/song/url/v1?id=${id}&level=standard`);
}
export const getMusicLyrics = (id: any) => {
    return request.get(`/lyric?id=${id}`);
}
export const getMoreMusicDetail = (ids: number[]) => {
    const idParam = ids.join(',');
    return request.get(`/song/url/?id=${idParam}&br=120000&cookie=${cookie}`)
    // http://localhost:3000/song/url/?id=33894312,405998841,2025337662,139764,1973046704&br=120000
}



