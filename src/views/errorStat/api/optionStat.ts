import apis from '@/service/interface'
import { useProjectStore } from '@/store/project';
import { fillingDate } from '@/utils/tools/fillingDate'

import { reactive } from 'vue';
const projectStore =useProjectStore();

export const option = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      name: 'days',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: []
})

export async function getOption(){
  const timestamp:Date=projectStore.getTimestamp;
  const res = await apis.error.api.getNumber({projectId:projectStore.getProjectId,timestamp:timestamp.getTime(),env:projectStore.getEnv})
  let xAxis:Array<string>=[];
  let errorData:Array<number> = [];
  let dataIndex=0;
  xAxis = fillingDate(timestamp, 30, 1000 * 60 * 60 * 24, 'YYYY-mm-dd');
  for(let item of xAxis){
    errorData.push(res.data.apiErrorData[dataIndex]?.timeType === item ? res.data.apiErrorData[dataIndex++].dataNumber : 0)
    // errorData.push(Math.random()*100)
  }
  option.xAxis[0].data=xAxis;
  option.series[0]={
    name: 'API错误数量',
    type: 'bar',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
    data: errorData
  };
}