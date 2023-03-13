<template>
  <div class="col-md-12">
        <LoadingMask :show="loadingFlag" />
    <div class="card text-black bg-light h-100">
      <div class="card-body" id="main-chart">
        <p>时间范围</p>
        <MCharts :option="option" />
      </div>
    </div>
  </div>
  <div class="row pt-3">
    <div class="col-md-12">
      <div class="card text-black bg-light h-100">
        <div class="card-body">
          <p>最新错误</p>
          <el-table :data="tableData.data" style="width: 100%">
            <el-table-column prop="pathName" label="接口"> </el-table-column>
            <el-table-column prop="eventType" label="事件类型" width="180">
            </el-table-column>
            <el-table-column prop="reportTimestamp" label="发生时间" width="180">
            </el-table-column>
          </el-table>
          <!-- <el-item index="/error_table"></el-item> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MCharts from "@/components/MCharts/MCharts.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { reactive, onMounted, ref } from "vue";
import { option, getOption } from "./optionStat";
import { useProjectStore } from "@/store/project";
import apis from "@/service/interface";

const porojectStore = useProjectStore();

let tableData = reactive({ data: [] });

onMounted(async () => {
    showLoading();
    await getOption();
  let newErrData = await apis.error.api.getList({
    projectId: porojectStore.getProjectId,
    timestamp: porojectStore.getTimestamp.getTime(),
    timeType: "days",
    range: 1,
    pageSize: 10,
    pageNum: 1,
  });
  tableData.data = newErrData.data.map((item: any) => ({
    ...item,
    pathName: decodeURIComponent(item.pathName).split("?")[0],
  }));
  tableData.data = tableData.data.slice(0,10)
  console.log("newErrData", tableData.data);
  // customData.data.map((item) => {
  //   item.title = encodeURIComponent(item.title);
  //   return item
  // })
  // jsPromise.data = jsPromiseData.data;
  // custom.data = customData.data;
  hideLoading();
});

let loadingFlag = ref(false);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}
</script>


<style scoped>
#main-chart {
  height: 300px;
  margin-bottom: 20px;
}
</style>