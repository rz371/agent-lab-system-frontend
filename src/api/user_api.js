import request from '@/utils/request'
export function getUserInfo(data){
    return request({
        url:'/user/info',
        method:'get',
        params:data
    })
}

export function updateUserInfo(data){
    return request({
        url:'/user/update',
        method:'put',
        data
    })
}

// 修改密码
export function updatePwd(data){
    return request({
        url:'/user/password',
        method:'put',
        data
    })
}

// 获取所有用户
export function getUserAll(data){
    return request({
        url:'/user/manager/all',
        method:'get',
        params:data
    })
}

// 新增用户
export function createUser(data){
    return request({
        url:'/user/manager/create',
        method:'post',
        data
    })
}
// 编辑用户
export function updateUser(data){
    return request({
        url:'/user/manager/update',
        method:'post',
        data
    })
}
// 删除用户
export function deleteUser(data){
    return request({
        url:'/user/manager/delete',
        method:'post',
        data
    })
}