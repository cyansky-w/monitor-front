<template>
  <div class="container-fluid p-4">
    <LoadingMask :show="loadingFlag" />

    <div class="row-title">
      <div class="fw-bold fs-4">接口耗时分析</div>
      <div class="block">
        <BaseTimePicker @change="resloveTimeChange" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 mb-3">
        <h6>接口耗时分段</h6>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button
            v-for="(item, index) in rangeDict"
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
              <span class="fs-2 p-1">{{ mainListNumber }}</span
              >数量
            </li>
            <li class="list-inline-item">
              <span class="fs-2 p-1"
                >{{ Number((mainListPercentage * 100).toFixed(2)) }}%</span
              >
              百分比
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7 mb-3">
        <!-- h-100 -->
        <h6>30天变化趋势</h6>
        <div class="chart-box">
          <MCharts :option="option30D" style="width: 100%; height: 180px" />
        </div>
      </div>
    </div>

    <div class="card">
      <div
        class="card-header d-flex align-items-center justify-content-between"
      >
        <div>接口列表（点击接口查看详情）</div>
        <!-- <div class="float-end">
          <MDropDown name="下拉3" @select="tapselect"></MDropDown>
        </div> -->
      </div>
      <div class="card-body">
        <div class="row p-3">
          <h6>24小时变化趋势</h6>
          <MCharts :option="option24H" style="width: 100%; height: 200px" />
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <ul class="list-group">
              <li
                class="list-group-item list-group-item-action"
                :class="{ active: selectedAddress == item.address }"
                aria-current="true"
                v-for="item in apiList.list"
                :key="item.mainId"
                @click="selectedAddress = item.address"
              >
                {{ item.address }}
              </li>
            </ul>
          </div>
          <div class="col-md-8 mb-3" v-if="selectedAddress !== ''">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">平均网络耗时</h5>
                    <p class="card-text">{{Number(pageDetail.averageTime.toFixed(2))}}ms</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">影响用户</h5>
                    <p class="card-text">{{ pageDetail.userNum }}</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">发生页面</h5>
                    <p class="card-text">{{pageDetail.pageNum}}</p>
                  </div>
                </div>
              </div>
            </div>
            <br /><br /><br />
            <h5>发生页面列表</h5>
            <div class="page-list">
              <div class="row" v-for="item in pageDetail.pageList" :key="item">
                <div class="col">
                  <text> {{decodeURIComponent(item.key)}} </text>
                </div>
                <div class="col text-end">
                  <text> {{item.value}} </text>
                </div>
              </div>
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
import { optionTrend, getOptionTrend } from "./option";
import { onMounted, reactive, ref, watch } from "vue-demi";
import apis from "@/service/interface";
import { useProjectStore } from "@/store/project";
import { hide } from "@popperjs/core";
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
async function changeRange(item: any) {
  if (item.value != subSelected.value) {
    subSelected.value = item.value;
    selectedAddress.value = '',
    await initData();
  }
}

async function resloveTimeChange() {
  await initData();
}
const mainListNumber = ref(0);
const mainListPercentage = ref(0);
const apiList = reactive({ list: [] });
const selectedAddress = ref('')
const pageDetail = reactive({
  averageTime: 0,
  userNum: 0,
  pageNum: 0,
  pageList: [{key:'', value:0}]
})
onMounted(async () => {
  await initData();
});

async function initData() {
  showLoading()
  let baseRes = await apis.performance.api.getApiNumberAndPercentage({
    projectId: projectStore.getProjectId,
    sub: subSelected.value,
    timestamp: projectStore.getTimestamp.getTime(),
    env: projectStore.getEnv,
  });
  if (baseRes.code === 200) {
    mainListNumber.value = baseRes.data.mainListNumber;
    mainListPercentage.value = baseRes.data.mainListPercentage;
  }
  getOptionTrend(
    option30D,
    projectStore.getTimestamp.getTime(),
    subSelected.value,
    30,
    "days"
  );
  getOptionTrend(
    option24H,
    projectStore.getTimestamp.getTime(),
    subSelected.value,
    24,
    "hours"
  );
  let listRes = await apis.performance.api.getApiMessage({
    projectId: projectStore.getProjectId,
    sub: subSelected.value,
    timestamp: projectStore.getTimestamp.getTime(),
    env: projectStore.getEnv,
  });
  if (listRes.code === 200) {
    apiList.list = listRes.data.apiList.map(
      (item: { [key: string]: any }) => ({
        ...item,
        address: decodeURIComponent(item.address),
      })
    );
  }
  hideLoading();
}

const apiInfo = reactive({ data: {} });
watch(selectedAddress ,async (newValue:string, oldValue:string) => {
  if(newValue !== ''){
    let res = await apis.performance.api.getApiInfo({
      address: newValue,
      projectId: projectStore.getProjectId,
      sub: subSelected.value,
      timestamp: projectStore.getTimestamp.getTime(),
      env: projectStore.getEnv,
    })
    if(res.code === 200){
      pageDetail.averageTime =  res.data.averageTime
      pageDetail.userNum =  res.data.usrerNumber
      pageDetail.pageNum =  res.data.urlNumber
      pageDetail.pageList =  res.data.pageList
    }
  }
})

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
.page-list .row:nth-child(2n-1) {
  background: #f0f0f0;
}
</style>