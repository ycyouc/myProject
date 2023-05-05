//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块中引入store仓库
import store from '@/store'

//1:利用axios对象的方法create创建一个axios实例
//2:request就是axios，就是稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求时路径会出现api
    baseURL:'/api',
    //代表请求超时的时间5s
    timeout:5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情

requests.interceptors.request.use((config)=>{
    //config：配置对象，header请求头属性很重要
    
    if(store.state.detail.uuid_token){
        //请求头添加字段(userTempId),和后台配合
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //判断需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //进度条开始动
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数,服务器相应数据回来后，可以检测到
    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('false'))
})

export default requests