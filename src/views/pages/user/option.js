import { reactive } from "@vue/reactivity";

export const option1 =reactive({
  // title: {
  //   text: 'World Population'
  // },
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top:'0',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    }
  ]
}) 