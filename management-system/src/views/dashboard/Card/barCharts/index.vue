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
                  type:'category'
              },
              yAxis:{
                  //隐藏y轴
                  show:false,
              },
              series:[
                  {
                      type:'bar',
                      data:[50,10,39,33,12,48,9,29,19,10,44],
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