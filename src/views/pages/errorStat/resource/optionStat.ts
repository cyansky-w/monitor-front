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
      left: '0',
      right: '0',
      bottom: '0',
      top:'10',
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
    series: [
    ]
  });

  export async function getOption(){
    const timestamp:Date=projectStore.getTimestamp;
    const res = await apis.error.resource.getNumBer({projectId:projectStore.getProjectId,timestamp:timestamp.getTime()})
    let xAxis:Array<string>=[];
    let resourceData:Array<number> = [];
    let resourceIndex=0;
    xAxis = fillingDate(timestamp, 30, 1000 * 60 * 60 * 24, 'YYYY-mm-dd');
    for(let item of xAxis){
      resourceData.push(res.data.resourceError[resourceIndex]?.timeType === item ? res.data.resourceError[resourceIndex++].dataNumber : 0)
    }
    console.log('resourceData', resourceData)
    option.xAxis[0].data=xAxis;
    option.series[0]={
      name: '资源错误数量',
      type: 'bar',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: resourceData
    };
  }