import { reactive } from 'vue'
export const option1 = reactive({

    title: {
        text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
});


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
    nowData.push(res.data.now[nowIndex]?.timeType === item ? res.data.now[nowIndex++].dataNumber : 0)
    weekAgoData.push(res.data.weekAgo[weekAgodex]?.timeType === item ? res.data.weekAgo[weekAgodex++].dataNumber : 0)
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
