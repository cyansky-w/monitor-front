<template>
  <div class="search-container">
    <p class="search-title">用户细查</p>
    <div class="search-box">
      <el-input
        class="input-search"
        v-model="input"
        placeholder="输入userId,,查询用户行为记录"
      />
      <el-button class="btn-search" type="primary" :icon="Search"
        >搜索</el-button
      >
    </div>
  </div>
  <el-table
    v-loading="loading"
    :data="userVisitList"
    @selection-change="handleSelectionChange"
  >
    <el-table-column label="用户Id" align="center" prop="userId" />
    <el-table-column label="访问页面" align="center" prop="page" />
    <el-table-column label="使用设备" align="center" prop="device" />
    <el-table-column label="访问IP" align="center" prop="ip" />
    <el-table-column label="位置" align="center" prop="place" />
    <el-table-column label="发生时间" align="center" prop="time" />
    <el-table-column label="操作" align="center" >
        <template #default>
            <router-link class="nav-link"  :to="{name: 'userDetail'}">查询用户明细</router-link>
        </template>
      </el-table-column>
    </el-table>

  <Pagination
    v-show="total>0"
    :total="total"
    :page="queryParams.pageNum"
    :limit="queryParams.pageSize"
    @pagination="getList"
    />
</template>

<script setup>
import Pagination from "@/components/Pagination/index.vue";
import { reactive, ref } from "@vue/reactivity";

let userVisitList=reactive([
    {
        userId:'124ef325rzw5',
        page:"https://www.test.com/home.html",
        device:"安卓",
        ip:'106.120.233.26',
        place:'中国 北京 北京市',
        time:'2021-02-22 10:01:04'
    },
    {
        userId:'124ef325rzw5',
        page:"https://www.test.com/home.html",
        device:"安卓",
        ip:'106.120.233.26',
        place:'中国 北京 北京市',
        time:'2021-02-22 10:01:04'
    },
    {
        userId:'124ef325rzw5',
        page:"https://www.test.com/home.html",
        device:"安卓",
        ip:'106.120.233.26',
        place:'中国 北京 北京市',
        time:'2021-02-22 10:01:04'
    },
    {
        userId:'124ef325rzw5',
        page:"https://www.test.com/home.html",
        device:"安卓",
        ip:'106.120.233.26',
        place:'中国 北京 北京市',
        time:'2021-02-22 10:01:04'
    },
])

let queryParams=reactive({
    pageNum:"1",
    size:10
})

let total=ref(10)

function getList(){
    
}
</script>

<style>
.search-container {
  background: #aaa;
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
  padding-bottom: 4rem;
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
.nav-link{
    cursor: pointer;
    color: #2ed796;
}
</style>