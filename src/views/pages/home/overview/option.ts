import { reactive } from "vue";
import apis from '@/service/interface'
import { useProjectStore } from '@/store/project';
import { fillingDate } from '@/utils/tools/fillingDate'
const projectStore = useProjectStore();

export const optionTrend = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
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
})

export const optionStatistical = reactive({
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '用户平均在线时长',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      data: [120, 200, 150, 80, 70, 110, 130],
    }
  ]
});

export const optionTop =reactive(
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
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        barMaxWidth: 25,
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      }
    ]
  }
) 


export const optionUserNum = reactive({
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
  xAxis: [
    {
      type: 'category',
      name: 'days',
      data: [],
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

export async function getOptionUserNum(){
  const timestamp:Date = projectStore.getTimestamp;
  const res = await apis.user.overView.getStatistical30D({projectId:projectStore.getProjectId,timestamp:timestamp.getTime(), env: projectStore.getEnv})
  let xAxis:Array<string>=[];
  let newUser:Array<number> = [];
  let oldUser:Array<number> = [];
  let newIndex=0;
  let oldIndex=0;
  xAxis = fillingDate(timestamp, 30, 1000 * 60 * 60 * 24, 'YYYY-mm-dd');
  for(let item of xAxis){
    newUser.push(res.data.newUserNumber[newIndex]?.timeType === item ? res.data.newUserNumber[newIndex++].dataNumber : 0)
    oldUser.push(res.data.oldUserNumber[oldIndex]?.timeType === item ? res.data.oldUserNumber[oldIndex++].dataNumber : 0)
  }
  optionUserNum.xAxis[0].data=xAxis.map(value => value.substring(5));
  optionUserNum.series[0]={
    name: '新用户',
    type: 'bar',
    stack: 'total',
    emphasis: {
      focus: 'series'
    },
    data: newUser
  };
  optionUserNum.series[1]={
    name: '老用户',
    type: 'bar',
    stack: 'total',
    emphasis: {
      focus: 'series'
    },
    data: oldUser
  }
}
export async function getOptionTrend(api:Function){
  const timestamp:Date = projectStore.getTimestamp;
  const res = await apis.user.getStatistical30D({projectId: projectStore.getProjectId, timestamp: timestamp.getTime(), env: projectStore.getEnv})
  let xAxis:Array<string>=[];
  let newUser:Array<number> = [];
  let weekAgoData:Array<number> = [];
  let newIndex=0;
  let oldIndex=0;
  xAxis = fillingDate(timestamp, 30, 1000 * 60 * 6, 'dd日HH:mm');
  for(let item of xAxis){
    newUser.push(res.data.newUserNumber[newIndex]?.timeType === item ? res.data.newUserNumber[newIndex++].dataNumber : 0)
    oldUser.push(res.data.oldUserNumber[oldIndex]?.timeType === item ? res.data.oldUserNumber[oldIndex++].dataNumber : 0)
  }
  
  optionUserNum.xAxis[0].data=xAxis.map(value => value.substring(5));
  optionUserNum.series[0]={
    name: '新用户',
    type: 'bar',
    stack: 'total',
    emphasis: {
      focus: 'series'
    },
    data: newUser
  };
  optionUserNum.series[1]={
    name: '老用户',
    type: 'bar',
    stack: 'total',
    emphasis: {
      focus: 'series'
    },
    data: oldUser
  }
}

export async function getOptionStatistical(option:object ,api:Function){
  const timestamp:Date = projectStore.getTimestamp;
  const res = await api({projectId:projectStore.getProjectId, timestamp: timestamp.getTime(), env: projectStore.getEnv})
  let xAxis:Array<string>=[];
  let data:Array<number> = [];
  xAxis = fillingDate(timestamp, 10, 1000 * 60 * 60 * 24, 'YYYY-mm-dd');
  option.xAxis.data=xAxis.map(value => value.substring(5));
  option.series[0]={
    name: '新用户',
    type: 'line',
    stack: 'total',
    emphasis: {
      focus: 'series'
    },
    data: res.data.reverse()
  };
}
export async function getOptionTop(option:object ,api:Function, appointNumber:number){
  const timestamp:Date = projectStore.getTimestamp;
  const res = await api({projectId: projectStore.getProjectId, appointNumber, env: projectStore.getEnv})
  console.log('res', res);
  type TopdataitemL = {
    "number":number,
    "appointName": string
  }
  if(api === apis.user.getTopUrl || api === apis.user.getTopByResourceUrl){
    option.grid = {
      left: '180',
      right: '50',
      bottom: '0',
      top: '10',
      containLabel: false
    },
    option.yAxis.data= res.data.map((item:TopdataitemL) => {return {value: decodeURIComponent(item.appointName),textStyle:{ width: 180,overflow: 'truncate'}}});
  }else{
    option.yAxis.data= res.data.map((item:TopdataitemL) => decodeURIComponent(item.appointName));
  }
  option.series[0]={
    name: '数量',
    type: 'bar',
    emphasis: {
      focus: 'series'
    },
    data: res.data.map((item:TopdataitemL) => item.number).reverse()
  };
}