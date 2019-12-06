import axios from 'axios';
import router from '../Routes.js';
import {
    to404Page
} from './utils.js';

const errorHandle = (status, msg) => {
    switch (status) {
        case 400:
            console.log(msg);
            break;
        case 401:
            break;
        case 403:
            break;
        case 404:
            to404Page();
            break;
        default:
            console.log("沒有攔截到的錯誤: " + msg);
    }
}

var instance = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api'
})

instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {
        response
    } = error;

    if (response) {
        errorHandle(response.status, response.data.error);
        return Promise.reject(error);
    } else {
        if (!window.navigator.onLine) {
            console.log("網路問題")
        } else {
            return Promise.reject(error);
        }
    }
});

export default function (method, url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data);
    } else if (method == 'get') {
        return instance.get(url, {
            params: data
        });
    } else {
        console.log("未知的method" + method);
        return false
    }
}