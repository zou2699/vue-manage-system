import axios from 'axios';
import { MessageBox, Message } from 'element-ui'
import router from "../router";

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor 请求拦截器
service.interceptors.request.use( config => {
    // do something before request is sent
    if (localStorage.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['Token'] = localStorage.token
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200){
        if (response.data.code === 20001) {
            router.replace('/')
            console.log("token过期");
        }
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;