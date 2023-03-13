<template>
  <div class="user-detai-container">
    <div class="card mb-3">
      <div class="card-header">
        <div class="d-inline-block p-2">访问详情</div>
        <!-- <div class="float-end">
          <el-date-picker
            v-model="queryParams.timestamp"
            type="datetime"
            placeholder="选择时间"
            :default-value="new Date()"
          />
        </div> -->
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h5>用户基本信息</h5>
            <p>用户标识：{{ entryInfo.data.uuid }}</p>
            <p>设备信息：{{ entryInfo.data.platform }}</p>
            <p>网络地址：{{ entryInfo.data.ip }}</p>
            <p>所在地区：{{ entryInfo.data.place }}</p>
          </div>
          <div class="col">
            <h5>页面平均加载时间</h5>
            <MCharts :option="pageList" height="80%" />
          </div>
          <div class="col">
            <h5>接口耗时区间分布</h5>
            <MCharts :option="apiList" height="80%" />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="d-inline-block p-2">用户行为记录</div>
      </div>
      <div class="card-body position-relative">
        <LoadingMask :show="loadingFlag" />
        <div class="row">
          <div class="col-12 list-container">
            <div
              class="list-item"
              v-for="(item, key) in actionList.data"
              :key="item.mainId"
              :class="{ active: key === selectedActionKey }"
              @click="selectAction(key)"
            >
              <div class="operation-icon">
                <img
                  :src="
                    '/src/assets/img/svg/' +
                    (['0', '1', '2', '15'].includes(item.typeId)
                      ? 'error.svg'
                      : ['9', '10'].includes(item.typeId)
                      ? 'warning.svg'
                      : 'visit.svg')
                  "
                  alt=""
                />
              </div>
              <div class="operation-info">
                <div>
                  <p>{{ actionTypeDict[item.typeId] }}</p>
                  <p class="float-end">{{ item.reportTimestamp }}</p>
                </div>
                <div>
                  <p v-if="['0', '1', '15'].includes(item.typeId)">
                    {{ decodeURIComponent(item.message) }}
                  </p>
                  <p v-else-if="['2', '3'].includes(item.typeId)">
                    {{ decodeURIComponent(item.filename) }}
                  </p>
                  <p v-else-if="['4', '5'].includes(item.typeId)">
                    {{ decodeURIComponent(item.pathName) }}
                  </p>
                  <p
                    v-else-if="
                      ['6', '7', '8', '9', '10', '11', '12'].includes(
                        item.typeId
                      )
                    "
                  >
                    {{ decodeURIComponent(item.url) }}
                  </p>
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
import MCharts from "@/components/MCharts/MCharts.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { onMounted, reactive, ref } from "vue-demi";
import apis from "@/service/interface";
import { useProjectStore } from "@/store/project";
import { optionPage, optionAPI } from "./option";
import { useRoute } from "vue-router";

const route = useRoute();
const actionTypeDict: Array<string> = [
  "JS错误",
  "Promise错误",
  "静态资源请求错误",
  "静态资源请求",
  "xhr接口调用",
  "fetch接口调用",
  "白屏",
  "页面加载",
  "页面渲染",
  "首次输入",
  "卡顿",
  "页面访问",
  "离开页面",
  "hash",
  "history",
  "自定义错误",
];
const projectStore = useProjectStore();
const loadingMask = ref(null);
let pageList = reactive(JSON.parse(JSON.stringify(optionPage)));
let apiList = reactive(JSON.parse(JSON.stringify(optionAPI)));
let actionList = reactive({ data: {} });

let queryParams = reactive({
  pageSize: 1,
  numSize: 10,
});
let selectedActionKey = ref("0");
let selectedAction = reactive({ data: {} });
function selectAction(key: string) {
  if (selectedActionKey.value !== key) {
    selectedActionKey.value = key;
    selectedAction.data = actionList.data[key];
    console.log("selectedAction", selectedAction);
  }
}

let entryInfo = reactive({ data: {} });

onMounted(async () => {
  console.log("query", route.query);
  entryInfo.data = JSON.parse(route.query.item);
  await initData();
});

async function initData() {
  showLoading();
  let pageLoadInfoRes = await apis.user.visit.getPageLoadInfo({
    mainId: entryInfo.data.mainId,
  });

  if (pageLoadInfoRes.code === 200) {
    for (let key of Object.keys(pageLoadInfoRes.data)) {
      pageList.yAxis.data.push(decodeURIComponent(key));
      pageList.series[0].data.push(
        (pageLoadInfoRes.data[key] / 1000).toFixed(2)
      );
    }
  }

  let apiLoadInfoRes = await apis.user.visit.getApiLoadInfo({
    mainId: entryInfo.data.mainId,
  });

  if (apiLoadInfoRes.code === 200) {
    for (let key of Object.keys(apiLoadInfoRes.data)) {
      apiList.yAxis.data.push(decodeURIComponent(key));
      apiList.series[0].data.push(apiLoadInfoRes.data[key]);
    }
  }
  let actionListRes = await apis.user.visit.getActionList({
    mainId: entryInfo.data.mainId,
  });

  if (actionListRes.code === 200) {
    actionList.data = actionListRes.data;
    selectedAction.data = actionListRes.data["0"];
  }
  hideLoading();
}
let loadingFlag = ref(true);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}
</script>

<style scoped>
.user-detai-container {
  padding: 1rem;
}
.list-container {
  overflow-y: auto;
  height: 45vh;
}
.list-item {
  display: flex;
  align-items: start;
  padding-bottom: 1rem;
  position: relative;
}
.list-item.active .operation-info {
  background: rgb(46, 215, 150, 0.4);
}
.operation-info {
  box-sizing: border-box;
  padding: 0 1rem;
  width: 100%;
  background: #f0f0f0;
  border-radius: 1rem;
}
.operation-info p {
  margin: 0.5rem 0;
}
.list-item:not(:last-child)::after {
  content: "";
  height: 50%;
  position: absolute;
  left: 1.25rem;
  bottom: 0.5rem;
  box-sizing: border-box;
  border-right: 1px solid #aaa;
}
.operation-detail-container {
  box-sizing: border-box;
  padding: 0.5rem;
}
.operation-detail {
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  height: 100%;
}

.operation-detail h5 {
  font-size: 0.9rem;
}
.operation-detail p {
  color: #666;
  font-size: 0.8rem;
}
.operation-detail p:last-child {
  margin: 0;
}

.operation-icon img {
  width: 40px;
  height: 40px;
  padding: 5px;
}
</style>