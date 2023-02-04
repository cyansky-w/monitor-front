<template>
  <div :id="uuid" :style="style"></div>
  <!-- :style="style" -->
</template>
<script setup>
import * as echarts from "echarts";
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue-demi";
// import {EleResize} from '@/assets/esresize.js';
const props = defineProps({
  height: {
    type: String,
    //   default: "400px",
    default: "100%",
  },
  width: {
    type: String,
    //   default: "600px",
    default: "100%",
  },
  option: {
    type: Object,
    default: null,
  },
});
let myChart;
const idGen =
  /**
   * 随机生成字符串
   * @param len 指定生成字符串长度
   */
  function (len = 16) {
    let _charStr =
        "abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
      min = 0,
      max = _charStr.length - 1,
      _str = ""; //定义随机字符串 变量
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for (var i = 0, index; i < len; i++) {
      index = (function (randomIndexFunc, i) {
        return randomIndexFunc(min, max, i, randomIndexFunc);
      })(function (min, max, i, _self) {
        let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
          numStart = _charStr.length - 10;
        if (i == 0 && indexTemp >= numStart) {
          indexTemp = _self(min, max, i, _self);
        }
        return indexTemp;
      }, i);
      _str += _charStr[index];
    }
    return _str;
  };

  watch(
    props.option, render
  )

async function render(cb,api) {
  if(props.option && props.option !== {}){
    myChart.setOption(props.option);
  }
}
defineExpose({
  render
})
let uuid = ref(idGen());
let style = computed(() => {
  return {
    height: props.height,
    width: props.width,
  };
});
function resize() {
  myChart.setOption(myChart.getOption());
  myChart.resize();
}
function showLoading(text) {
  myChart.showLoading({
    text,
    textStyle: { fontSize: 30, color: "#444" },
    effectOption: { backgroundColor: "rgba(0, 0, 0, 0)" },
  });
}

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});
onMounted(() => {
    myChart = echarts.init(document.getElementById(uuid.value))
  if(props.option && props.option !== {}){
    myChart.setOption(props.option);
  }
  window.addEventListener("resize", resize);
});
</script>