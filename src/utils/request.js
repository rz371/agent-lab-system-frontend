// 封装一下api

import axios from "axios"
import router from "@/router"
import { getToken, logout } from "./auth"
import { ElMessage } from "element-plus"
const service = axios.create({
    timeout:30000,
    baseURL:import.meta.env.VITE_API_BASE_URL_DEV
})

service.interceptors.request.use(config => {
    // 请求的时候要把token携带上
    const token = getToken()
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

service.interceptors.response.use(res => {
    const data = res.data
    if(data.code !== 200){
        ElMessage.error(data.message || '请求失败')
        if(data.code === 401){
            logout()
            router.push('/login')
            return Promise.reject(data)
        }
    } 
    return data
},error => {
    if(error.response){
        const httpStatusCode = error.response.status
        if(httpStatusCode === 401){
            logout()
            router.push('/login')
            return Promise.reject(data)
        } else {
            ElMessage.error(error.response.data?.message || '请求失败')
        }
    } else {
        // 如果没有的话，说明后端没启动
        ElMessage.error('网络异常，请稍后再试')
    }
    return Promise.reject(error)
})

export default service

