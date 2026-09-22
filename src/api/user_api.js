import request from '@/utils/request'
export function getUserInfo(data){
    return request({
        url:'/user/info',
        method:'get',
        data
    })
}

export function updateUserInfo(data){
    return request({
        url:'/user/update',
        method:'put',
        data
    })
}