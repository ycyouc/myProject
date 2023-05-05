<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    //监听bannerList数据的变化，由空数组变为四个元素
    list: {
      //list数据已经有了没用被监听到，立即执行一次
      immediate: true,
      handler(newValue, oldValue) {
        //如果执行handler方法，代表组件实例bannerList上这个属性已经有了
        this.$nextTick(() => {
          //执行这个回调的时候，保证服务器数据都回来了，v-for执行完毕了
          //$nextTick:可以保证页面中的结构一定是有的，和很多操作DOM的插件一起使用
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>