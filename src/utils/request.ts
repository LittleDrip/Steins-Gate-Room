//定制请求的实例
import axios from "axios";

// const baseURL = "/api"; //这个是在前端配置同源策略
const baseURL = 'http://localhost:3000';
const instance = axios.create({ baseURL })
// import { ElMessage } from "element-plus";
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {

    return config;
  },
  (err) => {
    //请求错误的回调
    Promise.reject(err)
  }
)

//添加响应拦截器
instance.interceptors.response.use(
  (result) => {
    return result.data;
  }

);

export default instance;
