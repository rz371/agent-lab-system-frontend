// 文件上传的api接口
import request from '@/utils/request'
export function updateFileApi(file){
    const formData = new FormData
    formData.append('file',file)
    return request({
        url:'/files/upload',
        method:'post',
        data:formData,
        headers:{'Content-Type':'multipart/form-data'}
    })
}