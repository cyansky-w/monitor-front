import {reactive} from 'vue'

export const option = reactive({
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
    }
  ]
});
export async function initOption(optionData){
  option.series[0].data = optionData;
}