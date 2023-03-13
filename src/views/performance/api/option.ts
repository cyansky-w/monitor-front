import apis from '@/service/interface'
import { useProjectStore } from '@/store/project';
import { fillingDate } from '@/utils/tools/fillingDate'
import { reactive } from 'vue';
import * as echarts from 'echarts';

const projectStore =useProjectStore();
export const optionTrend = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10',
    right: '50',
    bottom: '0',
    top: '10',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    boundaryGap: false
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110],
      type: 'line',
      smooth: 0.6,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
    }
  ]
})

export async function getOptionTrend(option:object, timestamp: number, sub: number, range: 30|24 , timeType?: 'days'|'hours'|'minutes'){
  const res = await apis.performance.api.getApiNumber({ projectId:projectStore.getProjectId, sub ,timestamp, env: projectStore.getEnv, timeType, range})
  console.log('response', res)
  let xAxis:Array<string>=[];
  let nowData:Array<number> = [];
  let nowIndex=0;
  if(range === 30 && timeType === "days"){
    xAxis = fillingDate(timestamp, range, 1000 * 60 * 60 * 24, 'mm-dd');
  }else if(range === 24 && timeType === "hours"){
    xAxis = fillingDate(timestamp, range, 1000 * 60 * 60, 'dd日HH:mm');
  }
  console.log('xAxis',xAxis)
  for(let item of xAxis){
    if(range === 30 && timeType === "days"){
      nowData.push(res.data[nowIndex] && res.data[nowIndex].timeType.slice(5) === item ? res.data[nowIndex++].dataNumber : 0)
    }else if(range === 24 && timeType === "hours"){
      nowData.push(res.data[nowIndex] && res.data[nowIndex].timeType.slice(11) === item.slice(3,5) ? res.data[nowIndex++].dataNumber : 0)
    }
    
  }
  
  option.xAxis.data = xAxis;
  option.series[0]={
    data: nowData,
    type: 'line',
    smooth: 0.6,
    areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: 'rgb(128, 255, 165)'
        },
        {
          offset: 1,
          color: 'rgb(1, 191, 236)'
        }
      ])
    },
  };
}
