<template>
    <div class="box-input">
      <el-input v-model="city" placeholder="Search for a city" clearable class="input-style"/>
      <el-button type="primary" @click="getLocationKey">Submit</el-button>
      <p v-show="isShow">Please search for a valid city</p>
    </div>
    <WeatherCard v-for="card in cardList" :key="card.Key" class="card-style" :cardInfo="card"></WeatherCard>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {reqGetLocationKey} from '../api'
import WeatherCard from './WeatherCard.vue';
let isShow = ref(false)
const city = ref('')
const cardList = reactive([])


async function getLocationKey() {
  try {
    let result = await reqGetLocationKey(city.value)
    if(result.data.length > 0) {
      isShow.value = false
      cardList.push(result.data[0])
    } else {
      isShow.value = true
    }
  } catch (error) {
    isShow.value = true
  }
}

</script>

<style scoped>
.input-style{
  width: 350px;
  margin-right: 10px;
}
.box-input {
  height: 50px;
}
.card-style {
  float: left;
  margin: 40px 25px 10px;
}
.box-input p {
  font-size: 14px;
}
</style>