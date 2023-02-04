
import { reactive } from "vue";
export const option1 = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
});

export const option2 = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});
export const option3 =reactive(
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
      right: '0',
      bottom: '0',
      top: '0',
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
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  }
) 