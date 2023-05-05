//当前模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"
//三级联动接口
// /api/product/getBaseCategoryList  get  无参数
//发请求:axios 发请求返回的结果是promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据 /api/list POST 请求带参数,给服务器传递一个默认参数，params至少是一个空对象

export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品详情信息的接口
export const reqGetDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中，或者更新某个产品个数 /cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//购物车列表/api/cart/cartList get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCaetById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册 /api/user/passport/register post
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data })

//登录 /api/user/passport/login  post
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data })

//获取用户信息（用token向服务器要用户信息）请求头  api/user/passport/auth/getUserInfo   get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录  /api/user/passport/logout  get
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })

//获取用户地址信息   api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

//获取订单交易信息  api/order/auth/trade  get
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' })

//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  post   (不用vuex写)
export const reqSubmitOrder = (tradeNo,data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post' ,data})

//获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心 我的订单信息  /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })