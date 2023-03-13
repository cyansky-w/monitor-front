<template>
  <div class="card text-black bg-light h-100">
    <div class="card-body">
      <p>全部错误</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="path" label="请求路径"> </el-table-column>
        <el-table-column prop="status" label="请求状态" width="180"></el-table-column>
        <el-table-column prop="url" label="请求页面" width="180"></el-table-column>
        <el-table-column prop="os" label="浏览器类型" width="180"></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
      </el-table>
      <Pagination
        v-show="total > 0"
        :total="total"
        :page="queryParams.pageNum"
        :limit="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination/index.vue";
import { reactive, ref } from "@vue/reactivity";
let total = ref(24)
let tableData=reactive([
    {
        path: decodeURIComponent("%2Fdev-api%2Fenhance%2Fperformance%2FgetPageInfo%3Furl%3Dhttp%3A%252F%252F127.0.0.1%3A8080%252Fperformance%252Fapi%26projectId%3Dawdafgawdfagrtdhgdrtg%26sub%3D0%26timestamp%3D1678463999000%26env%3Ddev"),
        status: decodeURIComponent("404-Not%20Found"),
        url: decodeURIComponent("http%3A%2F%2F127.0.0.1%3A8080%2Fperformance%2Fpage"),
        browser: "chrome",
        os: "windows",
        ip: "60.177.191.197",
    },{
        path: decodeURIComponent("%2Fdev-api%2Fenhance%2Fperformance%2FgetPageInfo%3Furl%3Dhttp%3A%252F%252F127.0.0.1%3A8080%252Fperformance%252Fapi%26projectId%3Dawdafgawdfagrtdhgdrtg%26sub%3D0%26timestamp%3D1678463999000%26env%3Ddev"),
        status: decodeURIComponent("404-Not%20Found"),
        url: decodeURIComponent("http%3A%2F%2F127.0.0.1%3A8080%2Fperformance%2Fpage"),
        browser: "chrome",
        os: "windows",
        ip: "60.177.191.197",
    },{
        path: decodeURIComponent("%2Fdev-api%2Fenhance%2Fperformance%2FgetPageInfo%3Furl%3Dhttp%3A%252F%252F127.0.0.1%3A8080%252Fperformance%252Fapi%26projectId%3Dawdafgawdfagrtdhgdrtg%26sub%3D0%26timestamp%3D1678463999000%26env%3Ddev"),
        status: decodeURIComponent("404-Not%20Found"),
        url: decodeURIComponent("http%3A%2F%2F127.0.0.1%3A8080%2Fperformance%2Fpage"),
        browser: "chrome",
        os: "windows",
        ip: "60.177.191.197",
    },{
        path: decodeURIComponent("%2Fdev-api%2Fenhance%2Fperformance%2FgetPageInfo%3Furl%3Dhttp%3A%252F%252F127.0.0.1%3A8080%252Fperformance%252Fapi%26projectId%3Dawdafgawdfagrtdhgdrtg%26sub%3D0%26timestamp%3D1678463999000%26env%3Ddev"),
        status: decodeURIComponent("404-Not%20Found"),
        url: decodeURIComponent("http%3A%2F%2F127.0.0.1%3A8080%2Fperformance%2Fpage"),
        browser: "chrome",
        os: "windows",
        ip: "60.177.191.197",
    },{
        path: decodeURIComponent("%2Fdev-api%2Fenhance%2Fperformance%2FgetPageInfo%3Furl%3Dhttp%3A%252F%252F127.0.0.1%3A8080%252Fperformance%252Fapi%26projectId%3Dawdafgawdfagrtdhgdrtg%26sub%3D0%26timestamp%3D1678463999000%26env%3Ddev"),
        status: decodeURIComponent("404-Not%20Found"),
        url: decodeURIComponent("http%3A%2F%2F127.0.0.1%3A8080%2Fperformance%2Fpage"),
        browser: "chrome",
        os: "windows",
        ip: "60.177.191.197",
    }
])
let queryParams = reactive({
  pageNum: 1,
  pageSize: 5,
  productId: null,
  materialId: null,
  processId: null,
  craftId: null,
  productName: null,
  craftName: null,
  processName: null,
  materialName: null,
  materialCount: null,
  level: null,
  materialType: null,
});
</script>


<style scoped>
</style>