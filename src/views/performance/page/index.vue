<template>
  <div class="container-fluid p-4">
    <LoadingMask :show="loadingFlag" />

    <div class="row-title">
      <div class="fw-bold fs-4">页面加载性能分析</div>
      <div class="block">
        <BaseTimePicker @change="resloveTimeChange"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 mb-3">
        <h6>接口耗时分段</h6>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button
            v-for="item in rangeDict"
            :key="item.value"
            class="btn btn-primary"
            :class="{ active: item.value === subSelected }"
            type="button"
            @click="changeRange(item)"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="w-100 h-50">
          <ul
            class="list-inline h-100 text-center d-flex align-items-center justify-content-center"
          >
            <li class="list-inline-item">
              <span class="fs-2 p-1">50</span>数量
            </li>
            <li class="list-inline-item">
              <span class="fs-2 p-1">0.01%</span> 百分比
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7 mb-3">
        <!-- h-100 -->
        <h6>30天变化趋势 <small>（点击切换其他日期）</small></h6>
        <div class="chart-box">
          <MCharts :option="option30D" style="width: 100%; height: 180px" />
        </div>
      </div>
    </div>

    <div class="card">
      <div
        class="card-header d-flex align-items-center justify-content-between"
      >
        <div>接口列表（点击查看接口详情）</div>
        <div class="float-end">
          <MDropDown name="下拉3" @select="tapselect"></MDropDown>
        </div>
      </div>
      <div class="card-body">
        <div class="row p-3">
          <h6>24小时天变化趋势 <small>（点击切换其他日期）</small></h6>
          <MCharts :option="option24H" style="width: 100%; height: 200px" />
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <ul class="list-group">
              <li
                class="list-group-item list-group-item-action"
                :class="{ active: urlSelected == item.url }"
                aria-current="true"
                v-for="item in pageList.list"
                :key="item.mainId"
                @click="urlSelected = item.url"
              >
                {{ item.url }}
              </li>
            </ul>
          </div>
          <div class="col-md-8 mb-3" v-if="urlSelected !== ''">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">平均网络耗时</h5>
                    <p class="card-text">
                      {{ Number(pageDetail.averageLoadTimeTime.toFixed(2)) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">采样数量</h5>
                    <p class="card-text">{{ pageDetail.sampleNumber }}</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">采样人数</h5>
                    <p class="card-text">{{ pageDetail.userNumber }}</p>
                  </div>
                </div>
              </div>
            </div>
            <br /><br />
            <h5>平均加载耗时列表(ms)</h5>
            <div class="card-body">
              <MCharts
                :option="optionSegment"
                style="width: 100%; height: 200px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import MCharts from "@/components/MCharts/MCharts.vue";
import { optionTrend, getOptionTrend, optionSegment } from "./option";
import { onMounted, reactive, ref, watch } from "vue";
import apis from "@/service/interface";
import { useProjectStore } from "@/store/project";

const projectStore = useProjectStore();

let option30D = reactive(JSON.parse(JSON.stringify(optionTrend)));
let option24H = reactive(JSON.parse(JSON.stringify(optionTrend)));

const rangeDict: any = reactive([
  {
    label: "小于1秒",
    value: 0,
  },
  {
    label: "1-5秒",
    value: 1,
  },
  {
    label: "5-10秒",
    value: 2,
  },
  {
    label: "10-30秒",
    value: 3,
  },
  {
    label: "大于30",
    value: 4,
  },
]);
let subSelected = ref(0);
let urlSelected = ref("");
let pageList = reactive({ list: [] });

async function changeRange(item: { label: string; value: number }) {
  if (item.value != subSelected.value) {
    subSelected.value = item.value;
    await initData();
  }
}

onMounted(async () => {
  await initData();
});

async function resloveTimeChange() {
  await initData();
}

async function initData() {
  showLoading();
  urlSelected.value = "";
  let res = apis.performance.api.getApiNumberAndPercentage({
    projectId: projectStore.getProjectId,
    sub: subSelected.value,
    timestamp: projectStore.getTimestamp.getTime(),
    env: projectStore.getEnv,
  });
  console.log("onMounted", res);
  getOptionTrend(option30D, projectStore.getTimestamp.getTime(), subSelected.value, 30, "days");
  getOptionTrend(option24H, projectStore.getTimestamp.getTime(), subSelected.value, 24, "hours");
  let listRes = await apis.performance.page.getPageMessage({
    projectId: projectStore.getProjectId,
    sub: subSelected.value,
    timestamp: projectStore.getTimestamp.getTime(),
    env: projectStore.getEnv,
  });
  if (listRes.code === 200) {
    pageList.list = listRes.data.pageList.map(
      (item: { [key: string]: any }) => ({
        ...item,
        url: decodeURIComponent(item.url),
      })
    );
  }
  hideLoading();
}

const selectedUrl = ref("");
let pageDetail = reactive({
  averageConnectTime: 0,
  averageTTFBTime: 0,
  averageResponseTime: 0,
  averageParseDomTime: 0,
  averageLoadDomTime: 0,
  averageTTI: 0,
  averageLoadTimeTime: 0,
  userNumber: 0,
  sampleNumber: 0,
});

watch(urlSelected, async (newValue: string, oldValue: string) => {
  if (newValue !== "") {
    let res = await apis.performance.page.getPageInfo({
      url: newValue,
      projectId: projectStore.getProjectId,
      sub: subSelected.value,
      timestamp: projectStore.getTimestamp.getTime(),
      env: projectStore.getEnv,
    });
    if (res.code === 200) {
      Object.assign(pageDetail, res.data);
      const data2:Array<number> = [
        res.data.averageConnectTime,  
        res.data.averageTTFBTime,  
        res.data.averageResponseTime,  
        res.data.averageParseDomTime,  
        res.data.averageLoadDomTime,  
        res.data.averageTTI ].map(item => Number(item.toFixed(2)))
      const data1:Array<number> = [];

      data2.reduce((previousValue: number, currentValue: number)=>{
        data1.push(previousValue);
        return previousValue + currentValue;
      }, 0)
      console.log('optionSegment',data1,data2)
        optionSegment.series[0].data = data1
        optionSegment.series[1].data = data2 
      console.log("pageDetail", pageDetail, optionSegment.series[0].data);
    }
  }
});

let loadingFlag = ref(true);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}
</script>

<style scoped>
.btn-group {
  height: 3rem;
}
.btn-group .active {
  background: #2ed796;
}
.list-group a:nth-child(2n) {
  background: #f0f0f0;
}
.list-group .active {
  background: #2ed796;
}

.page-list .row {
  padding: 0.5rem 0;
}
.page-list .row:nth-child(2n) {
  background: #f0f0f0;
}
</style>