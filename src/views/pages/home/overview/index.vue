<template>
  <div class="container-fluid">
    <div class="row-title">
      <div class="fw-bold fs-4">核心数据</div>
      <div class="block">
        <el-date-picker
          v-model="timestamp"
          type="date"
          placeholder="今天"
          :shortcuts="shortcuts"
          @change="projectStroe.setTimestamp"
        />
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-4 mb-3"> -->
      <div class="card text-black bg-light h-100" id="card-md12">
        <div class="card-header">流量数据</div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">浏览量(PV)</div>
                <div class="card-body">2109832</div>
              </div>
            </div>

            <div class="col">
              <div class="card">
                <div class="card-header">访客数(UV)</div>
                <div class="card-body">657891</div>
              </div>
            </div>

            <div class="col">
              <div class="card">
                <div class="card-header">新访客</div>
                <div class="card-body">129871</div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header">IP数</div>
                <div class="card-body">657591</div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header">频次(人均)</div>
                <div class="card-body">3.21</div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header">跳出率</div>
                <div class="card-body">59.05%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-md-12">
      <div class="card" style="height: 20rem" id="card-md12">
        <div class="card-header">
          <h6>用户量统计</h6>
        </div>
        <div class="card-body">
          <MCharts :option="optionUserNum" style="width: 100%; height: 100%" />
          <!-- <userPie /> -->
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-header">
          <h6>页面访问量趋势</h6>
        </div>
        <div class="card-body">
          <MCharts :option="optionTrend" style="width: 100%; height: 400px" />
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-header">
          <h6>用户活跃量趋势</h6>
        </div>
        <div class="card-body">
          <MCharts :option="optionTrend" style="width: 100%; height: 400px" />
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-header">
          <h6>新用户活跃量趋势</h6>
        </div>
        <div class="card-body">
          <MCharts :option="optionTrend" style="width: 100%; height: 400px" />
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 mb-3">
      <div class="card h-150">
        <div class="card-header">
          <h6>跳出率趋势</h6>
        </div>
        <div class="card-body">
          <MCharts :option="optionTrend" style="width: 100%; height: 400px" />
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card h-150">
        <div class="card-header">
          <h6>用户平均在线时长</h6>
        </div>
        <div class="card-body">
          <MCharts
            ref="chartAvgStay10H"
            :option="optionAvgStay10H"
            style="width: 100%; height: 400px"
          />
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card h-150">
        <div class="card-header">
          <h6>新用户次日留存率</h6>
        </div>
        <div class="card-body">
          <MCharts
            ref="chartNextDay10H"
            :option="optionNextDay10H"
            style="width: 100%; height: 400px"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="row-title">
    <div class="col-md-12 fw-bold fs-4">综合数据</div>
  </div>
  <div class="row flex-wrap">
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>网站访问量Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topUrl" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>来源网站Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topResourceUrl" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>城市名称访问用户量Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topCity" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>设备型号用户量Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topOS" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>浏览器使用量Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topBrowser" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h6>设备分辨率量Top 10</h6>
        </div>
        <div class="card-body">
          <MCharts :option="topScreen" style="width: 100%; height: 300px" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import MCharts from "@/components/MCharts/MCharts.vue";
import apis from "@/service/interface";

import {
  optionTrend,
  optionStatistical,
  optionTop,
  optionUserNum,
  getOptionUserNum,
  getOptionStatistical,
  getOptionTop
} from "./option";
import { useProjectStore } from "@/store/project";
import { ref, reactive, onMounted, onBeforeMount } from "vue";

let optionAvgStay10H = reactive(JSON.parse(JSON.stringify(optionStatistical)));
let optionNextDay10H = reactive(JSON.parse(JSON.stringify(optionStatistical)));
let topUrl = reactive(JSON.parse(JSON.stringify(optionTop)));
let topResourceUrl = reactive(JSON.parse(JSON.stringify(optionTop)));
let topCity = reactive(JSON.parse(JSON.stringify(optionTop)));
let topOS = reactive(JSON.parse(JSON.stringify(optionTop)));
let topBrowser = reactive(JSON.parse(JSON.stringify(optionTop)));
let topScreen = reactive(JSON.parse(JSON.stringify(optionTop)));

onMounted(async () => {
  // getOptionUserNum();
  getOptionUserNum();
  await getOptionStatistical(optionAvgStay10H, apis.user.overView.getAvgStay10H);
  await getOptionStatistical(optionNextDay10H, apis.user.overView.getNextDay10H);
  await getOptionTop(topUrl, apis.user.overView.getTopUrl, 10);
  await getOptionTop(topResourceUrl, apis.user.overView.getTopByResourceUrl, 10);
  await getOptionTop(topCity, apis.user.overView.getTopCity, 10);
  await getOptionTop(topOS, apis.user.overView.getTopOS, 10);
  await getOptionTop(topBrowser, apis.user.overView.getTopBrowser, 10);
  await getOptionTop(topScreen, apis.user.overView.getTopScreen, 10);
});

const projectStroe = useProjectStore();
let timestamp = ref(projectStroe.getTimestamp);
const shortcuts = reactive([
  {
    text: "现在",
    value: new Date(),
  },
  {
    text: "昨天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "一周前",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
]);
</script>


<style scoped>
.row-title {
  display: flex;
  width: 100%;
  height: 40px;
  margin: 0;
  margin-bottom: 10px;
  justify-content: space-between;
}

/* .row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display:         flex;
  flex-wrap: wrap;
}
.row > [class*='col-'] {
  display: flex;
  flex-direction: column;
}  */
#card-md12 {
  padding: 0px;
}
</style>