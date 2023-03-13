<template>
  <div class="search-container">
    <p class="search-title">用户细查</p>
    <div class="search-box">
      <el-input
        class="input-search"
        v-model="queryParams.uuid"
        placeholder="输入userId,查询用户行为记录"
      />
      <el-button class="btn-search" type="primary" :icon="Search" @click="getList"
        >搜索</el-button
      >
    </div>
  </div>

  <div class="card">
      <div class="row-title m-0  fliter-row">
      <div class="fw-bold fs-4">用户访问记录</div>
      <div class="block d-flex">
        <BaseTimePicker @change="resolveTimgChange"/>
        <el-input
        v-model="queryParams.ip" 
        class="w-50 ms-2 mb-2"
        placeholder="输入IP地址查询"
        :prefix-icon="Search"
      />
      <el-button class="btn-search" type="primary" :icon="Search" @click="getList"
        >搜索</el-button
      >
      </div>
    </div>
  </div>
  
  <el-table
    v-loading="loading"
    :data="userVisitList.data"
    @selection-change="handleSelectionChange"
  >
    <el-table-column label="用户Id" align="center" prop="uuid" />
    <el-table-column label="访问页面" align="center" prop="url" />
    <el-table-column label="使用设备" align="center" prop="platform" />
    <el-table-column label="访问IP" align="center" prop="ip" />
    <el-table-column label="位置" align="center" prop="place" />
    <el-table-column label="发生时间" align="center" prop="firstTimestamp" />
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <router-link class="nav-link" :to="{ name: 'userDetail', query: { item:JSON.stringify(scope.row) } }"
          >查询用户明细</router-link
        >
      </template>
    </el-table-column>
  </el-table>

  <Pagination
    v-show="total > 0"
    :total="total"
    :page="queryParams.pageNum"
    :limit="queryParams.pageSize"
    @pagination="getList"
  />
</template>

<script setup>
import Pagination from "@/components/Pagination/index.vue";
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from "vue-demi";
import apis from "@/service/interface";
import { useProjectStore } from "@/store/project";

const projectStore = useProjectStore();

let queryParams = reactive({
  pageSize: 1,
  numSize: 10,
  ip: '',
  uuid: ''
});

async function getList() {
  let res = await apis.user.visit.getList({
    projectId: projectStore.getProjectId,
    timestamp: +new Date(projectStore.getTimestamp),
    ...queryParams
  });
  if(res.code === 200){
    userVisitList.data = res.data.map(item => {
      return {
        ...item,
        url: decodeURIComponent(item.url),
        platform: item.os + ' ' + item.browser,
        place: item.ipCountry + ' ' + item.ipProvince + ' ' + item.ipCity,
      }
    })
  }
}


onMounted(async (query) => {

  await getList();
})

async function resolveTimgChange(e){
  console.log('e', e)
  queryParams =  Object.assign(queryParams,{
    pageSize: 1,
    numSize: 10,
  })
  await getList()
}
let userVisitList = reactive({data:[]});

let total = ref(1);
</script>

<style> 
.fliter-row{
  background: #eee;
  padding: 10px;
  height: 60px;
}

.fliter-row .btn-search {
  height: 32px;
  padding: 0 2rem;
  margin-left: 10px;
}
.search-container {
  background: url('/src/assets/img/login_bg.jpg');
  background-size: cover;
}
.search-title {
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  font-size: 2rem;
  color: white;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8rem;
}
.input-search {
  width: 30%;
  padding-right: 15px;
  height: 2.5rem;
}
.btn-search {
  height: 2.5rem;
  padding: 0 2rem;
}
.nav-link {
  cursor: pointer;
  color: #2ed796;
}
</style>