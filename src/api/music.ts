import request from "@/utils/request";
import { getCookie } from '@/utils/login';
let cookie = getCookie();
// 一人一首成名曲 9141068399
// 石头门 327707910
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX1/y0DBJJgDLjCODBxYhrExs/Ns5YtR22WU=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX1+AGk5eySPNZieEtOU3S5eEbEYv/d+21WQ=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX18i8ZMhDnO8KH4QPHNPvVS59m745SQgJPQ=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX1/pso+/xmEechnjLVSP1g49vMLcLiaDyVM=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX19NMfZZIpm5qWDGHIyc6JDvvKGCBz1aVQg=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX1/c2TyAlL4NY67DZQoljuAYIVXgVurkark=
// https://music.163.com/playlist?id=9143678935&uct2=U2FsdGVkX1/s7L9vpA57X2p4QMVES0tr9J3RTSp5Z+Q=
//https://music.163.com/playlist?id=&uct2=U2FsdGVkX1/puoPPWl6r1IQ/eN+2iUtV2RnzOkad1xk=
export const getMusicList = (id: any) => {
    if (id == 1) {
        return request.get("/playlist/track/all?id=443797814&limit=50&offset=0");
    } else if (id == 2) {
        return request.get("/playlist/track/all?id=9143678935&limit=100&offset=0");
    }
    else if (id == 3) {
        return request.get("/playlist/track/all?id=2799125848&limit=50&offset=0");
    } else if (id == 4) {
        return request.get("/playlist/track/all?id=752799182&limit=50&offset=0");
    } else if (id == 5) {
        return request.get("/playlist/track/all?id=8275028287&limit=50&offset=50");
    } else if (id == 6) {
        return request.get("/playlist/track/all?id=872823430&limit=50&offset=0");
    } else if (id == 7) {
        return request.get("/playlist/track/all?id=2520739691&limit=50&offset=0");
    } else if (id == 8) {
        return request.get("/playlist/track/all?id=3000016919&limit=50&offset=0");
    } else if (id == 9) {
        return request.get("/playlist/track/all?id=2301227992&limit=50&offset=0");
    } else if (id == 10) {
        return request.get("/playlist/track/all?id=2237551001&limit=50&offset=0");
    } else if (id == 11) {
        return request.get("/playlist/track/all?id=5059642708&limit=50&offset=0");
    } else if (id == 12) {
        return request.get("/playlist/track/all?id=10079657755&limit=50&offset=24");
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
    return request.get(`/song/url/?id=${idParam}&br=120000`, { params: { cookie: cookie } })
    // http://localhost:3000/song/url/?id=33894312,405998841,2025337662,139764,1973046704&br=120000
}



