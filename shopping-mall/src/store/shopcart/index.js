//购物车模块仓库
import { reqCartList, reqDeleteCaetById, reqUpdateCheckedById } from "@/api"
const state = {
    cartList: []
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCaetListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCaetById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //修改购物车选中状态
    async UpdateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //删除全部勾选产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCaetListBySkuId', item.skuId) : ''
            //将每次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //修改全部产品的选中状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked })
            //将每次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }

}

const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}