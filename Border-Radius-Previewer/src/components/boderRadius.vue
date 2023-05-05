<template>
  <div class="box">
    <div class="slider-demo-block">
      <el-slider v-model="value1" class="slider-row1" @input="changeRadius" />
      <el-slider v-model="value3" class="slider-row2" @input="changeRadius" />
      <el-slider
        v-model="value4"
        vertical
        height="400px"
        class="slider-col1"
        @input="changeRadius"
      />
      <el-slider
        v-model="value2"
        vertical
        height="400px"
        class="slider-col2"
        @input="changeRadius"
      />
    </div>
    <div class="border" :style="borderStyle"></div>
  </div>
  <div class="inputPosition">
    <span class="spanSize">border-radius:</span>
    <el-input v-model="inputText" readonly style="width: 320px"></el-input>
    <el-button
      type="primary"
      style="height: 40px; width: 80px"
      @click="copyTextFun"
      >COPY</el-button
    >
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let initValue = 50;
    const value1 = ref(initValue);
    const value2 = ref(initValue);
    const value3 = ref(initValue);
    const value4 = ref(initValue);
    let inputText = ref(
      `${value1.value}% ${100 - value1.value}% ${100 - value3.value}% ${
        value3.value
      }% / ${100 - value4.value}% ${100 - value2.value}% ${value2.value}% ${
        value4.value
      }%`
    );

    const borderStyle = ref({
      borderRadius: `${initValue}% ${initValue}% ${initValue}% ${initValue}% / ${initValue}% ${initValue}% ${initValue}% ${initValue}%`,
    });

    //change the 4 border-radius values that are applied to the box
    function changeRadius() {
      let moduleString = `${value1.value}% ${100 - value1.value}% ${
        100 - value3.value
      }% ${value3.value}% / ${100 - value4.value}% ${100 - value2.value}% ${
        value2.value
      }% ${value4.value}%`;
      borderStyle.value.borderRadius = moduleString;
      inputText.value = moduleString;
    }
    //copy the resulting CSS to the clipboard
    function copyTextFun() {
      let copyText = inputText.value;
      navigator.clipboard.writeText(copyText);
      alert('Copied to clipboard')
    }
    return {
      inputText,
      value1,
      value2,
      value3,
      value4,
      borderStyle,
      changeRadius,
      copyTextFun,
    };
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 460px;
}
.border {
  width: 400px;
  height: 400px;
  background: no-repeat center url(../assets/1.jpeg);
  border: 2px solid black;
  box-sizing: border-box;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  position: relative;
}
.slider-demo-block .slider-row1 {
  width: 400px;
  position: absolute;
  top: -219px;
  left: 0px;
}
.slider-demo-block .slider-row2 {
  width: 400px;
  position: absolute;
  top: 187px;
  left: 0px;
}
.slider-demo-block .slider-col1 {
  position: absolute;
  top: 0px;
  left: -22px;
}
.slider-demo-block .slider-col2 {
  position: absolute;
  top: 0px;
  left: 384px;
}
.spanSize {
  font-size: 18px;
  text-align: center;
  line-height: 30px;
}
.inputPosition {
  text-align: center;
}
</style>
<style>
.el-slider__bar {
  background-color: #e4e7ed;
}
.el-input__wrapper {
  height: 40px;
  margin-left: 10px;
}
.el-input__wrapper .el-input__inner {
  text-align: center;
}
</style>