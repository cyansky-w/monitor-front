

export const option = {
  // title: {
  //   text: 'Stacked Line'
  // },
  // tooltip: {
  //   trigger: 'axis'
  // },
  // legend: {
  //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  // },
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
  },
  xAxis: {
    type: 'category',
    show:true,
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    show:true,
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      areaStyle: {}
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
      areaStyle: {}
    },

  ]
}