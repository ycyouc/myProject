//search模块仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    searchInfo: {},
}
const mutations = {
    GETSEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}
const actions = {
    //获取search模块数据
    async getSearchInfo({ commit }, params = {}) {
        //该函数在调用服务器数据的时候params至少是一个空对象，params在用户派发action的时候
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data)
        }
    }
}
//项目中getters主要作用：简化仓库中的数据
const getters = {
    //形参：当前仓库中的state
    //如果服务器数据回来了是一个数组，假如没网路应该返回undefined，至少给一个数组
    goodsList(state){
        return state.searchInfo.goodsList||[]
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[]
    },
    attrsList(state){
        return state.searchInfo.attrsList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}