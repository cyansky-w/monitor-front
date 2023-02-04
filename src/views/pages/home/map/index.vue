<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 map-box">
                <div class="card text-black bg-light h-100">
                    <!-- <div class="card-header"> TTFB平均时间</div> -->
                    <div class="card-body  h-100">
                        <h5 class="card-title">静态资源加载报错</h5>
                        <div class="position-absolute top-0 end-0 card-body">
                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-outline-primary btn-sm" :class="{'btn-primary':isChina}" @click="mapChange">中国</button>
                                <button type="button" class="btn btn-outline-primary btn-sm" :class="{'btn-primary':!isChina}" @click="mapChange">世界</button>
                            </div>
                        </div>
                        <MCharts ref="mapChart" :option="isChina ? chinaOption : worldOption" height="calc(100% - 2rem)">
                        </MCharts>
                    </div>
                </div>
            </div>
            <div class="map-list">
                <div class="card text-black bg-light">
                    <div class="card-header"> TTFB平均时间</div>
                    <div class="card-body">
                        <table class="table table-borderless">
                            <div>
                                <div class="row text-center">
                                    <div class="col-4">排名</div>
                                    <div class="col-4">城市</div>
                                    <div class="col-4">用户数</div>
                                </div>
                            </div>
                            <tbody>
                                <div v-for="item in 10" :index="item"  class="row text-center">
                                    <div class="col-4">{{ item }}</div>
                                    <div class="col-4">城市</div>
                                    <div class="col-4">123</div>
                                </div>
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
import ScoreCircle from "@/components/ScoreCircle/ScoreCircle.vue";
import apis from "@/service/interface";
import { onMounted, ref, reactive } from "vue";
import { useProjectStore } from '@/store/project';
// import echarts from 'echarts';
import { chinaOption, initData } from "./optionChina";
import { worldOption } from "./optionWorld";

onMounted(() => {
    initData(chinaOption);
})

let isChina = ref(true);
let mapChart = ref(null);

function mapChange() {
    if (isChina.value) {
        isChina.value=false
    } else {
        isChina.value= true
    }
}


            // width_chart1: "200px",
            // height_chart1: "150px",
            // width_chart2: "150px",
            // height_chart2: "150px"
</script>


<style scoped>
.map-box {
    max-width: calc(100% - 30rem);
    height: calc(100vh - 7rem);
}

.map-list {
    width: 30rem;
}

.btn-outline-primary.btn-primary{
    color: white; 

}
</style>