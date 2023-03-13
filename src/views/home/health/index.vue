<template>
    <div class="container-fluid">
        <LoadingMask :show="loadingFlag" />

        <div class="row-title">
      <div class="fw-bold fs-4">健康数据</div>
      <div class="block">
        <BaseTimePicker @change="setData"/>
      </div>
    </div>

        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card text-black bg-light" >
                        <div class="card-body  " >
                            <div class="row score-row">
                                <div class="col-4">
                                    <div class="score-heath">
                                        <score-circle :score="score.data.projectScore" :showBg="false"></score-circle>
                                    </div>
                                    <div class="score-name">健康评分</div>
                                </div>
                                <div class="col-2">
                                    <div class="score-item">
                                        <score-circle :score="score.data.jsErrorNumber" :showBg="true"></score-circle>
                                    </div>
                                    <div class="score-name">JS错误量</div>
                                </div>
                                <div class="col-2">
                                    <div class="score-item">
                                        <score-circle :score="score.data.promiseErrorNumber" :showBg="true"></score-circle>
                                    </div>
                                    <div class="score-name">自定义错误量</div>
                                </div>
                                <div class="col-2">
                                    <div class="score-item">
                                        <score-circle :score="score.data.customMessageErrorNumber" :showBg="true"></score-circle>
                                    </div>
                                    <div class="score-name">静态资源错误率</div>
                                </div>
                                <div class="col-2">
                                    <div class="score-item">
                                        <score-circle :score="score.data.resourceErrorRate" :showBg="true"></score-circle>
                                    </div>
                                    <div class="score-name">接口异常错误率</div>
                                </div>
                            </div>
                            
                        </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-4 mb-3">
                <div class="card ">
                    <div class="card-body" >
                        <h5 class="card-title">Js报错趋势</h5>
                        <h6 class="card-subtitle mb-2 text-muted">2022-08-16</h6>
                        <MCharts  :option= "optionJs"  style="width: 100%; height: 250px;"/>
                    </div>     
                </div>
            </div>
            <div class="col-4 mb-3">
                <!-- -md-6 mb-3 -->
                <div class="card">
                    <!-- <div class="card-body" style="width: 100%; height: 100%"> -->
                    <div class="card-body" >
                        <h5 class="card-title">自定义异常趋势</h5>
                        <h6 class="card-subtitle mb-2 text-muted">2022-08-16</h6>
                        <MCharts  :option= "optionCustom" style="width: 100%; height: 250px;"/>
                    </div>   
                </div>
            </div>
            <div class="col-4 mb-3">
                <div class="card ">
                    <div class="card-body" >
                    <h5 class="card-title">静态资源加载报错</h5>
                    <h6 class="card-subtitle mb-2 text-muted">2022-08-16</h6>
                        <MCharts  :option= "optionResource" style="width: 100%; height: 250px;"/>
                    <!-- <MCharts :option= "optionTrend" style="max-width: 100%; max-height: 250px;"/> -->
                    </div>    
                </div>
            </div>
            <div class="col-4 mb-3">
                <div class="card ">
                    <div class="card-body" >
                        <h5 class="card-title">接口请求报错</h5>
                        <h6 class="card-subtitle mb-2 text-muted">2022-08-16</h6>
                            <MCharts  :option= "optionApi" style="width: 100%; height: 250px;"/>
                    </div>
                </div>
            </div>
        </div>

        <br/>
        <div class = "row">
            
        </div>
    </div>
</template>


<script setup lang="ts">

import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import MCharts from "@/components/MCharts/MCharts.vue";
import ScoreCircle from "@/components/ScoreCircle/ScoreCircle.vue";
import { optionTrend, getOptionTrend } from "./optionHealth";
import apis from "@/service/interface";
import { onMounted, reactive, ref } from "vue";
import { useProjectStore } from '@/store/project';
import { initData } from "../map/optionChina";
import { hide } from "@popperjs/core";
const projectStore = useProjectStore();
let score = reactive({data:{
    projectScore: 80,
    jsErrorNumber : 10,
    promiseErrorNumber : 12,
    customMessageErrorNumber: 9.99 ,
    resourceErrorRate: 9
}})
let optionJs = reactive(JSON.parse(JSON.stringify(optionTrend)));
let optionCustom = reactive(JSON.parse(JSON.stringify(optionTrend)));
let optionResource = reactive(JSON.parse(JSON.stringify(optionTrend)));
let optionApi = reactive(JSON.parse(JSON.stringify(optionTrend)));
onMounted(async ()=>{
    await setData();
})
async function setData(){
    // showLoading()
    score.data = (await apis.error.overView.getProjectScore({projectId: projectStore.getProjectId, timestamp: projectStore.getTimestamp, env: projectStore.getEnv})).data;
    await getOptionTrend(optionJs, apis.error.overView.getJsError24h);
    await getOptionTrend(optionCustom, apis.error.overView.getCustomError24h);
    await getOptionTrend(optionResource, apis.error.overView.getResourceError24h);
    await getOptionTrend(optionApi, apis.error.overView.getApiError24h);
    await getOptionTrend(optionApi, apis.error.overView.getPromiseError24h);
    // hideLoading();
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
.embed-responsive .card-img-top {
    object-fit: cover;
}
/* .pic1{
    object-fit: cover;
} */
.score-row{
    text-align: center;
    padding: 1rem 0;
}
.score-heath{
    box-sizing: border-box;
    padding: .5rem 12rem;
    position: relative;
    border-right: 1px solid #ddd ;
}
.score-item{
    box-sizing: border-box;
    padding: 1rem 5rem;
    position: relative;
}
</style>