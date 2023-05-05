<template>
    <div class="charts" ref="charts"></div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
      name:'',
      mounted(){
          let lineCharts = echarts.init(this.$refs.charts)
          lineCharts.setOption({
              xAxis:{
                  //隐藏x轴
                  show:false,
                  //最小值与最大值
                  min:0,
                  max:100,
              },
              yAxis:{
                  //隐藏y轴
                  show:false,
                  type:'category'
              },
              series:[
                  {
                      type:'bar',
                      data:[78],
                      barWidth:15,
                      color:'yellowgreen',
                      showBackground:true,
                      backgroundStyle:{
                        color:'#eee'
                      },
                      label:{
                        show:true,
                        formatter:'|',
                        position:'right'
                      }
                  }
              ],
              //布局
              grid:{
                  left:0,
                  right:0,
                  top:0,
                  bottom:0
              },
              tooltip:{}
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