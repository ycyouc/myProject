<script setup>
import CityInfo from './components/CityInfo.vue';
</script>

<template>
  <header></header>
  <div class="container">
    <div class="middle">
      <div>
        <h1>Simple Weather App</h1>
        <CityInfo></CityInfo>
      </div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
  </div>
  <footer></footer>


</template>

<style scoped>
h1 {
    font-size: 36px;
    margin-bottom: 20px;
}
header {
  width: 100%;
  height: 100px;
}
.container {
  overflow: hidden;
  padding: 0 200px;
}
.middle, .left, .right {
  float: left;
}
.middle {
  width: 100%;
}
.left {
  width: 200px;
  margin-left: -100%;
  position: relative;
  left: -200px;
}
.right {
  width: 200px;
  margin-left: -200px;
  position: relative;
  right: -200px;
}
footer {
  width: 100%;
  height: 100px;
}
</style>
