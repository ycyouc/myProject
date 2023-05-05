import request from '@/utils/request'

//获取SPU列表数据接口 /admin/product/{page}/{limit}  get
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`, method: 'get', params:{category3Id}})

//获取SPU信息 /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`, method: 'get'})

//获取品牌信息 /admin/product/baseTrademark/getTrademarkList get
export const reqTrademarkList = () => request({url:`/admin/product/baseTrademark/getTrademarkList`, method: 'get'})

//获取spu图片 /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`, method: 'get'})

//获取平台全部销售属性 最多三个 /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () => request({url:`/admin/product/baseSaleAttrList`, method: 'get'})

//保存spu数据  /admin/product/saveSpuInfo  post  /admin/product/updateSpuInfo
//修改或添加spu，区别是有无id字段
export const reqAddOrUpdateSpu = (spuInfo) => {
    if(spuInfo.id){
        return request({url:`/admin/product/updateSpuInfo`, method: 'post', data:spuInfo})
    }else{
        return request({url:`/admin/product/saveSpuInfo`, method: 'post', data:spuInfo})
    }
}

//删除spu接口 /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`, method: 'delete'})

//获取图片数据接口 /admin/product/spuImageList/{spuId} get
// export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`, method: 'get'})

//获取销售属性的数据 /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`, method: 'get'})

//获取平台属性数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get'})

//保存skuForm  /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => request({url:`/admin/product/saveSkuInfo`, method: 'post', data:skuInfo})

//获取sku列表数据 /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`, method: 'get' })