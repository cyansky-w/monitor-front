<template>
    <div class="cotainer p-3">
        <div class="card text-black bg-light h-100">
            <div class="card-body" id="main-chart">
                <div class="row-title">
                <div class="fw-bold fs-4">静态资源</div>
                <div class="block">
                    <BaseTimePicker/>
                </div>
                </div>
                <div class="row">
                    
                    <div class="col-8 ">
                        <p>近30天静态资源错误量</p>
                        
                        <div class="chart-box">
                            <HelloEcharts :option="option" />
                        </div>
                    </div>
                    <div class="col-4"> 
                        <p>今日概况</p>
                        <div class="row h-100">
                            <div class="col-6 h-50">
                                总发生次数：{{ overViewData.data.errorNumber }}
                            </div>
                            <div class="col-6 h-50">
                                总影响页面数：{{ overViewData.data.pageNumber }}
                            </div>
                            <div class="col-6 h-50">
                                总影响用户数：{{ overViewData.data.userNumber }}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>资源加载报失败列表</p>
                    <div class="row p-2 error-item" v-for="item in resourceErrorList" :key="item">
                        <div class="col">
                            <text>
                                {{ item.msg }}
                            </text>
                        </div>
                        <div class="col text-end">
                            <text>
                                {{ item.time }}
                            </text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        

    </div>
</template>

<script setup>
import HelloEcharts from "@/components/MCharts/MCharts.vue";
import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import { reactive, onMounted } from "vue";
import { option, getOption } from "./optionStat";
import { useProjectStore } from "@/store/project";
import apis from "@/service/interface";
let overViewData = reactive({data: {}})
onMounted(async() => {
    getOption();
    let overviewRes = await apis.error.resource.getTody();
    overViewData.data = overviewRes.data;
})

const resourceErrorList = reactive([{
    msg: "http://localhost:3000/js.js 【总共:11次 | 发生页面:1个】【Script】",
    time: "2020-03-10 16:08:37"
},{
    msg: "http://localhost:3000/img 【总共:8次 | 发生页面:1个】【IMG】",
    time: "2020-03-10 21:35:21"
}])

onMounted

</script>

<style scoped>
.chart-box{
    box-sizing: border-box;
    height: 15rem;
    padding:1rem 2rem ;
}
.error-item:nth-child(2n){
    background: #f0f0f0;
}
</style>