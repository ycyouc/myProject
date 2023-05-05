//路由懒加载
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Paysuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    //重定向，在项目跑起来的时候立马定向到首页
    {
        path: "",
        redirect: "/home"
    },
    //引入路由组件
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: "search",
        path: "/search/:keyword?",
        //?代表params参数可传可不传
        component: ()=>import('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: "/login",
        component:  ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: "/detail/:skuId",
        component: ()=>import('@/pages/Detail'),
        meta: { show: false }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面必须从购物车来
            if (from.path == '/shopcart') {
                next()
            } else {
                //其他页面来
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去trade页面必须从购物车来
            if (from.path == '/trade') {
                next()
            } else {
                //其他页面来
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        component: Paysuccess,
        meta: { show: true }
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
]