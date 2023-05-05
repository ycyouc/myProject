//品牌管理数据的接口模块
import request from '@/utils/request'
//获取品牌列表接口  /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//处理添加品牌 /admin/product/baseTrademark/save  post 两个参数：品牌名称 品牌logo；切记：ID是由服务器生成
//处理修改品牌/admin/product/baseTrademark/update  put  三个参数： id 品牌名称 品牌logo 带ID告诉服务器修改哪个品牌
export const reqAddorUpdateTradeMark = (tradeMark) => {
    //如果带id
    if (tradeMark.id) {
        return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark })
    } else {
        //添加品牌
        return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark })
    }
}

//删除品牌的接口 /admin/product/baseTrademark/remove/{id}

export const reqDeleteTrademark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })