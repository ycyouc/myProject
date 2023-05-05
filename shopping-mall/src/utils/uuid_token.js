import {v4 as uuidv4} from 'uuid'
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = ()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //本地存储没有则生成
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token
}