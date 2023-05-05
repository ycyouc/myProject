import { reqAddOrUpdateShopCart, reqGetDetailInfo } from "@/api"
//封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    detailInfo: {},
    //游客临时身份
    uuid_token:getUUID()
}

const mutations = {
    GETDETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    },
}

const actions = {
    //获取产品信息action
    async getDetailInfo({ commit }, skuId) {
        let result = await reqGetDetailInfo(skuId)
        if (result.code == 200) {
            commit('GETDETAILINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //将参数带给服务器，只返回code==200，没有数据，不需要三连环
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }
    }
}

const getters = {
    categoryView(state) {
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}