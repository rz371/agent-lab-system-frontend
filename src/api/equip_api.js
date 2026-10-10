import request from '@/utils/request'

export function getEquipAll(data){
    // 查
    return request({
        url:'/equip/info',
        method:'get',
        params:data
    })
}

export function createEquip(data){
    // 增
    return request({
        url:'/equip/create',
        method:'post',
        data
    })
}

export function updateEquip(data){
    // 改
    return request({
        url:'/equip/update',
        method:'post',
        data
    })
}

export function deleteEquip(data){
    // 删
    return request({
        url:'/equip/delete',
        method:'post',
        data
    })
}
    

export function descEquip(id,params){
    return request({
        url:`/equip/desc/${id}`,
        method:'get',
        params
    })
}
    