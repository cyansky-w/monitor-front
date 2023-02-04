<template>
    <div class="container-fluid">
        <div class="row-title">
            <div class="col-md-12 fw-bold fs-4">页面性能</div>  
        </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">TTFB平均时间</h5>
                            <p class="card-text">              
                                {{pageAvg.data.ttfbTimeAvg}}
                            <small>ms</small></p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">Dom解析时间</h5>
                            <p class="card-text">
                                {{pageAvg.data.parseDomTimeAvg}}

                                <small>s</small>
                            </p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">页面平均加载时间</h5>
                            <p class="card-text">
                                {{pageAvg.data.allTimeAvg}}
                                <small>s</small>
                            </p>
                        </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h6>页面加载耗时分段数量占比</h6>
                    </div>
                    <div class="card-body">
                        <MCharts :option="option1" style="width: 100%; height: 100%"/>

                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        页面加载耗时路由Top10
                    </div>
                    <div class="card-body">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">页面路由</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">平均耗时</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/</th>
                                    <td>6.62万</td>
                                    <td>3.96s</td>
                                </tr>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/des.html</th>
                                    <td>5.53万</td>
                                    <td>1.38s</td>
                                </tr>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/home.html</th>
                                    <td>5.53万</td>
                                    <td>1.38s</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-title">
            <div class="col-md-12 fw-bold fs-4">接口性能</div>  
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">接口请求总量</h5>
                            <p class="card-text">
                                {{apiAvg.data.numberInSevenDays}}
                                <small>ms</small>
                            </p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">接口请求平均耗时</h5>
                            <p class="card-text">
                                {{apiAvg.data.averageTime}}
                                <small>ms</small>          
                            </p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                             <h5 class="card-title">接口请求成功率</h5>
                            <p class="card-text">
                                {{apiAvg.data.successPre}}
                            </p>
                        </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="card " style="height: 20rem;">
                    <div class="card-header">
                        接口请求耗时分段数量占比
                    </div>
                    <div class="card-body">
                        <MCharts :option="option1" style="width: 100%; height: 100%"/>
                    </div>
                </div>
            </div>
           <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        接口请求耗时Top10
                    </div>
                    <div class="card-body">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">接口地址</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">平均耗时</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/</th>
                                    <td>6.62万</td>
                                    <td>197.7ms</td>
                                </tr>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/des.html</th>
                                    <td>5.53万</td>
                                    <td>197.7ms</td>
                                </tr>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/home.html</th>
                                    <!-- <td colspan="2">5.53万</td> -->
                                    <td>5.53万</td>
                                    <td>197.7ms</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>

import MCharts from "@/components/MCharts/MCharts.vue";
import { option1 } from "./optionPerformance";
import apis from "@/service/interface";
import { onMounted, reactive } from "vue";
import { useProjectStore } from '@/store/project';
const projectStore = useProjectStore();
let pageAvg = reactive({data:{}})
let apiAvg = reactive({data:{}})
onMounted(async ()=>{
    pageAvg.data = (await apis.performance.overView.getPageAVGTime({projectId: projectStore.getProjectId, timestamp: projectStore.getTimestamp.getTime(), env: projectStore.getEnv})).data;
    apiAvg.data = (await apis.performance.overView.getApiAVGTime({projectId: projectStore.getProjectId, timestamp: projectStore.getTimestamp.getTime(), env: projectStore.getEnv})).data;
    console.log('onMounted', pageAvg.data, apiAvg.data)
})


</script>


<style scoped>
.title{
    flex:3
}
.row {
    display:flex;
}
.card-title{
    font-size: 18px;
}
.card-text{
    font-size: 30px;
    font-weight: bold;
}
.row-title{
    display:flex;
    /* text-align: center; */
    /* line-height: 10px; */
    height: 40px;
    margin-top: -20px;
    /* margin-bottom: 10px; */
    justify-content: center;
    flex-direction: column;
}
</style>