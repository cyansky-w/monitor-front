import { reactive } from "@vue/reactivity";

export const optionPage =reactive(
  {
    // title: {
    //   text: 'World Population'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '0',
      right: '50',
      bottom: '0',
      top: '10',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      position: 'top',
    },
    yAxis: {
      type: 'category',
      data:[],
    },
    series: [
      {
        name: '平均加载耗时',
        type: 'bar',
        barMaxWidth: 25,
        label:{
          show:true,
          formatter:'{c}s',
          position:'right'
        },
        data: []
      }
    ]
  }
)

export const optionAPI =reactive(
  {
    // title: {
    //   text: 'World Population'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '0',
      right: '50',
      bottom: '0',
      top: '10',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      position: 'top',
    },
    yAxis: {
      type: 'category',
      data:[],
    },
    series: [
      {
        name: '调用次数',
        type: 'bar',
        barMaxWidth: 25,
        label:{
          show:true,
          formatter:'{c}次',
          position:'right'
        },
        data: []
      }
    ]
  }
)