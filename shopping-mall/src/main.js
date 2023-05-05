import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//三级联动组件全局引用
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

//引入路由
import router from '@/router'
//引入vuex仓库
import store from '@/store'

//引入虚拟数据mockServe.js
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'
//全局引入轮播图
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
//全局引入分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

import { Button, MessageBox } from 'element-ui';
//全局注册
Vue.component(Button.name, Button);
//挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import img from '@/assets/1.jpg'
//注册插件
Vue.use(VueLazyload,{
    //懒加载默认图片
    loading:img
})

//引入表单校验插件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册vuex仓库
    store,
    beforeCreate(){
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
}).$mount('#app')

