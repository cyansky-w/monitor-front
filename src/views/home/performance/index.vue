<template>
        <LoadingMask :show="loadingFlag" />

    <div class="container-fluid">
        <div class="row-title">
      <div class="fw-bold fs-4">页面性能</div>
      <div class="block">
        <BaseTimePicker @change="setData"/>

      </div>
    </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">TTFB平均时间</h5>
                            <p class="card-text">              
                                {{Number(pageAvg.data.ttfbTimeAvg.toFixed(2))}}
                            <small>ms</small></p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">Dom解析时间</h5>
                            <p class="card-text">
                                {{Number(pageAvg.data.parseDomTimeAvg.toFixed(2))}}

                                <small>ms</small>
                            </p>
                        </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card text-black bg-light h-100" >
                        <div class="card-body">
                            <h5 class="card-title">页面平均加载时间</h5>
                            <p class="card-text">
                                {{Number(pageAvg.data.allTimeAvg.toFixed(2))}}
                                <small>ms</small>
                            </p>
                        </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card"  style="height: 20rem;">
                    <div class="card-header">
                        <h6>页面加载耗时分段数量占比</h6>
                    </div>
                    <div class="card-body">
                        <MCharts :option="optionPage" style="width: 100%; height: 100%"/>

                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        页面加载耗时路由Top3
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
                                    <td>2.53万</td>
                                    <td>1.38s</td>
                                </tr>
                                <tr>
                                    <th scope="row">https://www.webfunny.cn/home.html</th>
                                    <td>1.53万</td>
                                    <td>1.12s</td>
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
                                {{Number(apiAvg.data.numberInSevenDays.toFixed(2))}}
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
                                {{Number(apiAvg.data.averageTime.toFixed(2))}}
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
                                {{Number(apiAvg.data.successPre.toFixed(2))}}
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
                        <MCharts :option="optionAPI" style="width: 100%; height: 100%"/>
                    </div>
                </div>
            </div>
           <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        接口请求耗时Top3
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
                                    <th scope="row">/enhance/main/searchDataByDesignation</th>
                                    <td>6.62万</td>
                                    <td>3452.6ms</td>
                                </tr>
                                <tr>
                                    <th scope="row">/enhance/error/numberOfResourceErrorTodayData</th>
                                    <td>5.53万</td>
                                    <td>1252.6ms</td>
                                </tr>
                                <tr>
                                    <th scope="row">/enhance/user/getTwentyFourHourUv</th>
                                    <!-- <td colspan="2">5.53万</td> -->
                                    <td>3.22万</td>
                                    <td>1000.04 ms</td>
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

import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import MCharts from "@/components/MCharts/MCharts.vue";
import { option1, getOption } from "./optionPerformance";
import apis from "@/service/interface";
import { onMounted, reactive, ref } from "vue";
import { useProjectStore } from '@/store/project';
const projectStore = useProjectStore();
const optionPage = reactive(JSON.parse(JSON.stringify(option1)))
const optionAPI = reactive(JSON.parse(JSON.stringify(option1)))
let pageAvg = reactive({
    data:{
        ttfbTimeAvg: 0,
        parseDomTimeAvg: 0,
        allTimeAvg: 0
    }
})
let apiAvg = reactive({
    data:{
        numberInSevenDays: 0,
        averageTime: 0,
        successPre: 0
    }
})
onMounted(async ()=>{
    await setData();
})
async function setData(){
    showLoading()
    pageAvg.data = (await apis.performance.overView.getPageAVGTime({projectId: projectStore.getProjectId, timestamp: projectStore.getTimestamp.getTime(), env: projectStore.getEnv})).data;
    apiAvg.data = (await apis.performance.overView.getApiAVGTime({projectId: projectStore.getProjectId, timestamp: projectStore.getTimestamp.getTime(), env: projectStore.getEnv})).data;
    console.log('onMounted', pageAvg.data, apiAvg.data)
    await getOption(optionPage)
    await getOption(optionAPI)
    hideLoading()
}
let loadingFlag = ref(false);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}
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
</style>