<template>
  <div>
    <div>
      <div class="row-title">
        <div class="fw-bold fs-4">{{ memberList.data.name }}</div>
        <div class="block">
          <button
            class="btn btn-primary px-3 py-1 d-inline-block"
            @click="dialogVisible = true"
          >
            + 生成邀请码
          </button>
        </div>
      </div>
      <el-table :data="memberList.data.member" style="width: 100%">
        <el-table-column prop="name" label="成员">
          <template #default="scope">
            <div class="btn-admin">{{ scope.row.name.substring(0, 1) }}</div>
            <span> {{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间" width="500"></el-table-column> -->
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.oprate"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleUpdate(scope.row)"
              >删除</el-button
            >
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
    <el-dialog
      v-model="dialogVisible"
      title="获取邀请码"
      width="30%"
      :before-close="handleClose"
    >
      <div class="input-box" @click="clearValue">
        <label for="login_name" class="iconfont verify-icon">+86</label>
        <input
          id="login_name"
          type="text"
          class="input-account"
          placeholder="请输入手机号"
          v-model="phone"
          @input="checkNUm"
        />
        <button class="iconfont icon-clear icon-xmark"></button>
      </div>
      <div class="input-box">
        <input
          id="login_name"
          type="text"
          maxlength="6"
          class="input-verify"
          placeholder="请输入验证码"
          v-model="verificationCode"
          @input="checkNUm"
        />
        <button class="btn btn-verify">获取验证码</button>
      </div>
      <div>
        邀请码：faouwehflahwf-awdhaklwhd-awdlhj
        <div class="tips-text"></div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { computed, onMounted, onUpdated } from "vue";

const userStore = useUserStore();
const route = useRoute();

console.log("query", route.query);
// let total=ref(6);

let total = computed(() => memberList.data.member.length);

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
function handleUpdate(row: any) {}

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {};
const memberList = reactive({
  data: {
    name: "",
    member: [],
  },
});
onMounted(() => {
  getList();
});
onUpdated(() => {
  getList();
});
function getList() {
  if (route.query.teamId) {
    memberList.data = userStore.getTeamList[route.query.teamId];
  }
}
</script>

<style>
.tips-text {
  color: #aaa;
  font-size: 0.5em;
}
.btn-admin {
  display: inline-block;
  background: #21d48f;
  width: 35px;
  height: 35px;
  text-align: center;
  padding: 5px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
}
</style>