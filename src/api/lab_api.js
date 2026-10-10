import request from '@/utils/request'

export function getLabAll(data){
    // 查
    return request({
        url:'/lab/info',
        method:'get',
        params:data
    })
}

export function createLab(data){
    // 增
    return request({
        url:'/lab/create',
        method:'post',
        data
    })
}

export function updateLab(data){
    // 改
    return request({
        url:'/lab/update',
        method:'post',
        data
    })
}

export function deleteLab(data){
    // 删
    return request({
        url:'/lab/delete',
        method:'post',
        data
    })
}


export function descLab(id){
    // 获取具体的实验室数据
    return request({
        url:`/lab/desc/${id}`,
        method:'get'
    })
}

    

