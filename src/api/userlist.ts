import request from "@/utils/requestWs";

export const getUserListService = () => {
    return request.get('/list/rooms');
}