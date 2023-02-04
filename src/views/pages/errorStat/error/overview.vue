<template>
  <div class="col-md-12">
    <div class="card text-black bg-light h-100">
      <div class="card-body" id="main-chart">
        <p>时间范围</p>
        <HelloEcharts :option="option" />
      </div>
    </div>
  </div>
  <div class="row pt-3">
    <div class="col-md-6">
      <div class="card text-black bg-light h-100">
        <div class="card-body">
          <p>JS错误</p>
          <!--<el-table :data="jsPromise.data" style="width: 100%">
            <el-table-column prop="error" label="错误">
            </el-table-column>
            <el-table-column prop="count" label="发生次数" width="180">
            </el-table-column>
            <el-table-column prop="people" label="影响人数" width="180">
            </el-table-column>
          </el-table>
           <el-item index="/error_table"></el-item> -->
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card text-black bg-light h-100">
        <div class="card-body">
          <p>自定义异常</p>
          <!--<el-table :data="custom.data" style="width: 100%">
            <el-table-column prop="error" label="错误"> </el-table-column>
            <el-table-column prop="count" label="发生次数" width="180">
            </el-table-column>
            <el-table-column prop="people" label="影响人数" width="180">
            </el-table-column>
          </el-table>
           <el-item index="/error_table"></el-item> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HelloEcharts from "@/components/MCharts/MCharts.vue";
import { reactive, onMounted } from "vue";
import { option , getOption } from "./optionStat";
import { useProjectStore } from "@/store/project";
import apis from "@/service/interface";

const porojectStore = useProjectStore();

let jsPromise = reactive({data:[]})
let custom = reactive({data:[]})

getOption();
onMounted(async() => {
  let jsPromiseData = await apis.error.jsPromise.getList({ projectId: porojectStore.getProjectId, type: 'jsError', timestamp: porojectStore.getTimestamp.getTime(), timeType: 'days' });
  let customData = await apis.error.jsPromise.getList({ projectId: porojectStore.getProjectId, type: 'custommessage', timestamp: porojectStore.getTimestamp.getTime(), timeType: 'days' });
  jsPromiseData.data.map((item) => {
    item.title = decodeURI(item.title);
    return item
  })
  customData.data.map((item) => {
    item.title = encodeURIComponent(item.title);
    return item
  })
  jsPromise.data = jsPromiseData.data;
  custom.data = customData.data;
})
</script>


<style scoped>
#main-chart {
  height: 300px;
  margin-bottom: 20px;
}
</style>