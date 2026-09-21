// 获取token，保存token，移除token，获取用户，保存用户，移除用户
const TOKEN = 'token'
const USERINFO = 'userInfo'
export function getToken(){
    return localStorage.getItem(TOKEN)
}

export function setToken(token){
    localStorage.setItem(TOKEN,token) 
}

export function removeToken(){
    localStorage.removeItem(TOKEN)
}

export function getUserInfo(){
    // 因为拿到的是json类型
    const str = localStorage.getItem(USERINFO)
    return str ? JSON.parse(str) : null
}

export function setUserInfo(data){
    // 因为data是对象类型，存storage里面需要json类型
    localStorage.setItem(USERINFO,JSON.stringify(data)) 
}

export function removeUserInfo(){
    localStorage.removeItem(USERINFO)
}


// 退出逻辑
export function logout(){
    removeUserInfo()
    removeToken()

}