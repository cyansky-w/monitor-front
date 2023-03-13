import * as echarts from 'echarts'
import china from '@/utils/map/china.json'
import { useProjectStore } from '@/store/project';
import apis from '@/service/interface'
import { fillingDate } from '@/utils/tools/fillingDate'
import { reactive, computed } from 'vue';
type MapDict = {
    [name: string]: [xAxis: number, yAxis: number, value: number]
}
type MapType = Array<{
    name: string,
    value: [xAxis: number, yAxis: number, value: number,]
}>
echarts.registerMap('china', china);
const projectStore = useProjectStore();

export async function initData(option: object) {
    let { overData , markList} = await getData();
    async function getData() {
        // const res = await apis.user.overView.getTopByCountry({ projectId: projectStore.getProjectId, isWorld: 0, appointNumber: 5, timestamp: projectStore.getTimestamp.getTime(), env: projectStore.getEnv })
        const res = await apis.user.overView.getTopByCountry({ projectId: projectStore.getProjectId, isWorld: 0, appointNumber: 5, timestamp:projectStore.timestamp.getTime(), env: projectStore.getEnv })
        console.log('res', res)
        const mapData: MapDict = {};

        let dataTop5 = [];
        let markList = [];
        let overData = []
        for (let i = 0; i < china.features.length; i++) {
            let name: string = china.features[i].properties.name;
            let center = china.features[i].properties.center;
            let xAxis = center ? center[0] : 0
            let yAxis = center ? center[1] : 0
            let item = res.data.filter((item: { number: number, appointName: string }) => {
                return item.appointName === name
            })[0];

            let num = item ? item.number : 0;

            overData.push({ name, value: num })
            mapData[name] = [xAxis, yAxis, num]
        }

        for (let i = 0; i < 5; i++) {
            if (!res.data[i]) {
                break;
            }
            let name = res.data[i].appointName;
            let [xAxis, yAxis, value] = mapData[name]
            markList.push({ coord: [xAxis, yAxis], value, name })
        }

        return { overData, markList };
    };
    // option.geo.regions = mapColor;
    // option.series[0].data = dataTop5;
    option.series[1].markPoint.data = markList;
    option.series[0].data = overData;
    return markList;
}



function getMapColor(dataValue: MapDict) {
    let data = [];
    for (let key of Object.keys(dataValue)) {
        let [xAxis, yAxis, value] = dataValue[key]
        if (value > 0 && value < 50) {
            data.push({
                name: key,
                itemStyle: {
                    areaColor: '#94d2ff',
                    color: '#94d2ff'
                }
            })
        } else if (value < 100) {
            data.push({
                name: key,
                itemStyle: {
                    areaColor: '#52b7ff',
                    color: '#52b7ff'
                }
            })
        } else if (value >= 100) {
            data.push({
                name: key,
                itemStyle: {
                    areaColor: '#24a4ff',
                    color: '#24a4ff'
                }
            })
        }

    }
    return data;
}

export const chinaOption = reactive({
    tooltip: {
        trigger: 'item',
    },
    visualMap: {
        min: 0,
        max: 100,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['#98ccf5', '#4ffcff', '#87ffc7']
        },
    },
    geo: {
        map: "china",
        roam: false,// 一定要关闭拖拽
        show: false,
        zoom: 1.2,
        label: {
            normal: {
                show: false, //关闭省份名展示
            },
            emphasis: {
                show: true,
                fontSize: "12",
                color: "rgba(0,0,0,0.7)"
            }
        },

    },
    series: [
        {
            name: '用户在线人数',
            type: 'map',
            map: 'china',
            zoom: 1.2,
            label: {
                normal: {
                    show: false, //关闭省份名展示
                },
                emphasis: {
                    show: true,
                    fontSize: "12",
                    color: "rgba(0,0,0,0.7)"
                }
            },
            data: [],
            
        },
        {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: 8,
            tooltip: {
                show: true
            },
            encode: {
                value: 2
            },
            showEffectOn: "render",
            rippleEffect: {
                brushType: "stroke",
                period: 9,
                scale: 5
            },
            hoverAnimation: true,
            label: {
                formatter: "{@value}",
                position: "top",
                show: false,
            },
            itemStyle: {
                color: "#ffc64a",
                shadowBlur: 2,
                shadowColor: "#333"
            },
            markPoint: {
                symbolSize: 25,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 
                data: []
            },
            zlevel: 1
        }
    ]
})
