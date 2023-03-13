import { reactive } from 'vue'
export const option1 = reactive({
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
            { value: 1048, name: '< 1s' },
            { value: 655, name: '1-5s' },
            { value: 321, name: '5-10s' },
            { value: 20, name: '10-30s' },
            { value: 10, name: '>30s' },
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


export async function getOption(option:object){
  option.series[0].data = [
    { value: Math.random(), name: '< 1s' },
    { value: Math.random(), name: '1-5s' },
    { value: Math.random(), name: '5-10s' },
    { value: Math.random(), name: '10-30s' },
    { value: Math.random(), name: '>30s' },
  ]
}
