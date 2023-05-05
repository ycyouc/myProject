//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)

//引入store仓库
import store from '@/store'

import routes from './routes'
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push|replace
//第一个参数为原push方法跳转路径,第二个成功的回调，第三个失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        //y=0代表滚动条最上方
        return { y: 0 }
    }
})

//全局守卫，前置
router.beforeEach(async (to, from, next) => {
    //next:放行函数 next() next('/login') next(false)
    let token = store.state.user.token
    //用户信息 判断空对象为真所以用name
    let name = store.state.user.userInfo.name
    if (token) {
        //登录了，去登录界面
        if (to.path == '/login') {
            next('/')
        } else {
            //登录了，去别的界面
            if (name) {
                //如果用户名已有
                next()
            } else {
                //没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    //获取用户信息成功，放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效了 获取不到用户信息，重新登录 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }

            }
        }

    } else {
        //未登录:不能去交易相关、支付相关 pay paysuccess、个人中心
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //未登录去这些路由--登录
            //把未登录想去而没有去成的信息存在地址栏【路由】中
            next('/login?redirect='+toPath)
        } else {
            // 未登录去其他，放行
            next()
        }

    }
})

export default router