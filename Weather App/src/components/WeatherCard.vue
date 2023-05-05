<template>
  <div>
    <el-card shadow="always" class="box-card" v-if="weatherInfo[0]">
      <span class="city-name"
        >{{ props.cardInfo.LocalizedName
        }}<sup
          >&nbsp;<el-tag
            class="city-name-sup"
            color="#FF8C00"
            size="small"
            round
            >{{ props.cardInfo.Country.ID }}</el-tag
          ></sup
        ></span
      >
      <div class="city-temp">
        {{ parseInt(weatherInfo[0][0].Temperature.Metric.Value) }}<sup>℃</sup>
      </div>
      <el-icon class="weather-type"><Sunny /></el-icon>
      <p>{{ weatherInfo[0][0].WeatherText }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { reqGetLocationInfo } from "../api";
const weatherInfo = reactive([]);
const props = defineProps(["cardInfo"]);

async function getLocationInfo() {
  try {
    let result = await reqGetLocationInfo(props.cardInfo.Key);
    if (result.status == 200) {
      weatherInfo.push(result.data);
      console.log(weatherInfo[0][0]);
    }
  } catch (error) {
    console.log(error.message)
  }
}

//判断天气类型 Cloudy Overcast Sunny Mostly cloudy Clouds and sun <el-icon><Cloudy /></el-icon>
function name(params) {}

onMounted(() => {
  getLocationInfo();
});
</script>

<style scoped>
.box-card {
  width: 240px;
  border-radius: 25px;
  color: #53627c;
}
.box-card .city-name {
  font-size: 2em;
}
.box-card .city-name .city-name-sup {
  padding: 5px;
  /* border-radius: 12px; */
  color: #fff;
}
.box-card .city-temp {
  font-size: 5rem;
  font-weight: 700;
  color: #1e2432;
  margin-top: 5px;
  margin-bottom: 5px;
}
.box-card .city-temp sup {
  font-size: 0.5em;
  font-weight: 400;
}
.box-card .weather-type {
  font-size: 6rem;
  margin-top: 5px;
  margin-bottom: 10px;
}
.box-card p {
  font-size: 1.25em;
  margin-bottom: 10px;
}
</style>