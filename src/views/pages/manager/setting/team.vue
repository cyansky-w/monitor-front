<template>
  <div>
    <div>
      <p>全部错误</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="成员">
            <template #default="scope">
                <div class="btn-admin">{{scope.row.name.substring(0,1)}}</div>
                <span> {{scope.row.name}} </span>
            </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="500"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button
                    v-if="scope.row.role !== '管理员'"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleUpdate(scope.row)"
                >删除</el-button>
                <span v-else> --- </span>
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
    </div>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination/index.vue";
import { reactive, ref } from "@vue/reactivity";
let tableData = reactive([
  {
    name: "管理员",
    email: "test@163.com",
    createTime: new Date(),
    role: "管理员",
  },
  {
    name: "成员",
    email: "test@163.com",
    createTime: new Date(),
    role: "成员",
  },
  {
    name: "成员",
    email: "test@163.com",
    createTime: new Date(),
    role: "成员",
  },
  {
    name: "成员",
    email: "test@163.com",
    createTime: new Date(),
    role: "成员",
  },
  {
    name: "成员",
    email: "test@163.com",
    createTime: new Date(),
    role: "成员",
  },
]);
let total=ref(6);
let queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
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
function handleUpdate(){}
</script>

<style>
.btn-admin{
    display: inline-block;
    background: #21d48f;
    width:35px;
    height: 35px;
    text-align: center;
    padding: 5px;
    border-radius: 50%;
    color: white;
    cursor: pointer;
}
</style>