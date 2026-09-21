// 有可能用户更新信息了，但是我们没有拿取最新的值，不随时刷新，
// 所以，这里面需要写 获取最新数据的方法
// 这个只能在 setup的script里面用 ,因为成功的秘诀是 ref这个响应式

import { ref } from "vue";
import { removeToken, removeUserInfo, setToken, setUserInfo,getUserInfo } from "./auth";



// 把获取用户信息变成响应式,如果后续手动更新userInfo的话,那么页面用到的都会刷新
const userInfo = ref(getUserInfo())
// hook , 如果是hook,起名就是useXXX
export function useUser(){
    
    // 登录完毕
    function saveLoginData(data){
        setToken(data.token)
        setUserInfo(data.user)

        // 手动通知,userInfo变了
        userInfo.value = data.user
    }

    // 更新user -- 个人中心修改了资料可以用到
    function updateUser(user){
        setUserInfo(user)
        userInfo.value = user
    }

    // F5刷新页面,或者在别的标签页改了信息,切回你的标签页(实时同步)
    function reloadUser(){
        userInfo.value = getUserInfo()
    }

    
    return {
        userInfo,
        saveLoginData,
        updateUser,
        reloadUser,
        
    }
    
}
