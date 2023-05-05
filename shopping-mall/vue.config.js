const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    //map文件可以像未加密的代码一样，准确输出哪一行有错，不需要可以去掉
    productionSourceMap:false,
    transpileDependencies: true,
    lintOnSave: false,
    //代理跨域
    devServer:{
        proxy:{
            '/api':{
                target:'http://gmall-h5-api.atguigu.cn',
                // pathRewrite:{'^/api': ''}
            }
        }
    }
})