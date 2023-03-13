import apis from '@/service/interface'
import { useProjectStore } from '@/store/project';
import { fillingDate } from '@/utils/tools/fillingDate'
import { reactive } from 'vue';
const projectStore =useProjectStore();

export const optionTrend = {
  // title: {
  //   text: 'Stacked Line'
  // },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '10',
    right: '10',
    bottom: '0',
    top: '10',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
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
};

export async function getOptionTrend(option:object, api:Function){
  const timestamp:Date = projectStore.getTimestamp;
  const res = await api({projectId:projectStore.getProjectId, timestamp: timestamp.getTime(), env: projectStore.getEnv})
  console.log('response', res)
  let xAxis:Array<string>=[];
  let nowData:Array<number> = [];
  let weekAgoData:Array<number> = [];
  let nowIndex=0;
  let weekAgodex=0;
  xAxis = fillingDate(timestamp, 24, 1000 * 60 * 60, 'dd日HH:mm');
  console.log('xAxis',xAxis)
  for(let item of xAxis){
    nowData.push(Math.random()*1000)
    weekAgoData.push(Math.random()*1000)
    // nowData.push(res.data.now[nowIndex]?.timeType === item ? res.data.now[nowIndex++].dataNumber : 0)
    // weekAgoData.push(res.data.weekAgo[weekAgodex]?.timeType === item ? res.data.weekAgo[weekAgodex++].dataNumber : 0)
  }
  
  option.xAxis.data = xAxis;
  option.series[0]={
      name: '当天',
      type: 'line',
      data: nowData
  };
  option.series[1]={
    name: '一周前',
    type: 'line',
    data: weekAgoData
  }
}
