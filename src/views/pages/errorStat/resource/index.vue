<template>
    <div class="cotainer p-3">
        <div class="card text-black bg-light h-100">
            <div class="card-body" id="main-chart">
                <div class="row">
                    
                    <div class="col-8 ">
                        <p>资源加载报错</p>
                        
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
                    <div class="row p-2 error-item" v-for="item in 10" :key="item">
                        <div class="col">
                            <text>
                                assets**com/ltvfe/cl/loan_records.e67a2f5e.chunk.js 【总共:11次 | 发生页面:1个】（10）
                            </text>
                        </div>
                        <div class="col text-end">
                            <text>
                                2020-02-01 21:35:21
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