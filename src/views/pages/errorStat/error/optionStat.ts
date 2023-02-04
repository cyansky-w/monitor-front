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
  const res = await apis.error.jsPromise.getNumBer({projectId:projectStore.getProjectId,timestamp:timestamp.getTime()})
  let xAxis:Array<string>=[];
  let jsData:Array<number> = [];
  let promiseData:Array<number> = [];
  let jsIndex=0;
  let promiseIndex=0;
  xAxis = fillingDate(timestamp, 30, 1000 * 60 * 60 * 24, 'YYYY-mm-dd');
  for(let item of xAxis){
    jsData.push(res.data.jsErrorData[jsIndex]?.timeType === item ? res.data.jsErrorData[jsIndex++].dataNumber : 0)
    promiseData.push(res.data.promiseErrorData[promiseIndex]?.timeType === item ? res.data.promiseErrorData[promiseIndex++].dataNumber : 0)
  }
  option.xAxis[0].data=xAxis;
  option.series[0]={
    name: 'JS错误',
    type: 'bar',
    stack: 'total',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
    data: jsData
  };
  option.series[1]={
    name: 'Promise错误',
    type: 'bar',
    stack: 'total',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
    data: promiseData
  }
}