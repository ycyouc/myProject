<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name:'lineCharts',
    mounted(){
        let lineCharts = echarts.init(this.$refs.charts)
        lineCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                type:'category'
            },
            yAxis:{
                //隐藏y轴
                show:false,
            },
            series:[
                {
                    type:'line',
                    data:[50,10,39,33,12,48,9,29,19,10,44],
                    //不显示拐点
                    itemStyle:{
                        opacity:0
                    },
                    //线条样式
                    lineStyle:{
                        color:"purple"
                    },
                    //填充颜色
                    areaStyle:{
                        color:{
                            type:'line',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: "#fff" // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    smooth:true
                }
            ],
            //布局
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            }
        })
    }
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>