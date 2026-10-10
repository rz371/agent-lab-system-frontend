
import request from '@/utils/request'
export function createReserve(data){
    return request({
        url:'/reservation/create',
        method:'post',
        data
    })
}
