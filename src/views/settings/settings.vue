<template>
  <div class="bg-light py-4">
    <LoadingMask :show="loadingFlag" />
    <div class="container-xl rounded-3 bg-white py-3">
      <div class="setting-content border-bottom pb-3">
        <div class="d-flex justify-content-between">
          <div class="fs-4 fw-bold">设置</div>
          <div class="fw-bold">
            <!-- <el-button text @click="dialogVisible = true">
              click to open the Dialog
            </el-button> -->
            <button class="btn btn-primary px-2 py-1" @click="onSave">
              保存
            </button>
            <button class="btn btn-danger px-2 py-1 ms-3" @click="onDelete">
              删除
            </button>
          </div>
        </div>
      </div>
      <div class="setting-content form">
        <div class="fs-6 pb-3 fw-bold">基本信息</div>
        <div class="mb-3 row">
          <label for="projectName" class="require col-sm-2 col-form-labe"
            >应用名称</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="projectName"
              v-model="baseInfo.data.name"
              placeholder="请输入应用名称"
            />
          </div>
        </div>
        <div class="alert alert-danger m-0" role="alert" v-show="alert">
          应用名称不能为空
        </div>
        <div v-if="route.query.isCreate != 1">
          <div class="mb-3 row">
            <label for="createTime" class="col-sm-2 col-form-label"
              >创建时间</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control-plaintext"
                readonly
                id="createTime"
                v-model="baseInfo.data.createTime"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="projectId" class="col-sm-2 col-form-label"
              >应用Id</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control-plaintext"
                readonly
                id="projectId"
                v-model="baseInfo.data.projectId"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="projectId" class="col-sm-2 col-form-label"
              >所属团队</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control-plaintext"
                readonly
                id="createTime"
                v-model="baseInfo.data.teamName"
              />
            </div>
          </div>
        </div>
        <div class="mb-3 row" v-else>
            <label for="projectId" class="require col-sm-2 col-form-label"
              >所属团队</label
            >
            <div class="col-sm-10">
              <MDropDown
                class="team-list"
                :show-name="false"
                :menu-list="teamArr"
                style="width: 200px"
              />
            </div>
        </div>
      </div>
      <div class="setting-content form">
        <div class="fs-6 pb-3 fw-bold">应用配置</div>
        <div
          class="mb-3 row"
          v-for="(configItem, configIndex) in configList"
          :key="configItem.value"
        >
          <label for="createTime" class="col-sm-2 col-form-label">{{
            configItem.name
          }}</label>
          <div class="col-sm-10 d-flex align-items-center">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :checked="configItem.checked"
                :id="`config_${configItem.value}`"
                @click="checkConfig(configIndex)"
              />
              <label
                class="form-check-label"
                :for="`config_${configItem.value}`"
                >{{ configItem.describe }}</label
              >
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">配置代码</label>
          <div class="col-sm-10">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="配置代码"
              class="setting-code"
              v-model="configStr"
            >
            </textarea>
          </div>
        </div>
      </div>

      <el-dialog
        v-model="dialogVisible"
        title="验证"
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
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useProjectStore } from "@/store/project";
const userStore = useUserStore();
const projectStore = useProjectStore();

const route = useRoute();
const router = useRouter();
let configList = reactive([
  {
    name: "首屏指标",
    describe: "开启此选项后，将采集首屏FP，FCP，FMP，LCP数据",
    value: "firstScreen",
    checked: false,
  },
  {
    name: "资源监听",
    describe: "开启此选项后，实时上报页面加载的静态资源。",
    value: "resource",
    checked: false,
  },
  {
    name: "api上报",
    describe: "开启此选项后，实时上报页面请求相关数据。",
    value: "api",
    checked: false,
  },
  {
    name: "白屏上报",
    describe: "开启此选项后，上报页面渲染白屏数据。",
    value: "blank",
    checked: false,
  },
  {
    name: "SPA模式",
    describe: "开启此项后，会开启对路由变化监控，上报针对单页面应用不同页面。",
    value: "spa",
    checked: false,
  },
]);

let baseInfo = reactive({
  data: {
    projectId: "",
    env: "",
    timestamp: "",
    name: "",
    createTime: "",
    teamName:''
  },
});
let configStr = computed(() => {
  let configStr =
    "import monitor from '@/utils/monitor/index.js'\nmonitor.setconfig({";
  for (let configItem of configList) {
    configStr += `\n${configItem.value} : ${configItem.checked},`;
  }
  configStr += `\npid : ${baseInfo.data.projectId},`;
  configStr += `\nproduction:'dev'\n});\nmonitor.useMonitor();`;
  return configStr;
});

function checkConfig(index: number) {
  configList[index].checked = !configList[index].checked;
}
let alert = ref(false);
let loadingFlag = ref(false);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}

function onSave() {
  showLoading();
  setTimeout(() => {
    if (route.query.isCreate == 1) {
        userStore.addProject();
    }
    hideLoading(),
      ElMessage({
        message: "创建成功",
        type: "success",
      });
    router.replace('/');
  }, 1000);
}

const teamArr = reactive([
  { name: "前端监控", value: 0 },
  { name: "客道互动", value: 1 },
]);

onMounted(() => {
  if (route.query.isCreate != 1) {
    configList.map((item) => (item.checked = true));
    baseInfo.data = projectStore.getInfo;
  }
});

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss">
.team-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  border: none;
  background: none;
}
input {
  border: none;
}
.setting-content {
  padding: 1rem 8rem;
}
.setting-code {
  width: 100%;
  height: 10rem;
  border: none;
  background: #fafafa;
}
.require {
  position: relative;
}
.require::after {
  content: "*";
  position: absolute;
  left: 0;
  top: 0;
  color: red;
}

.input-verify {
  width: 100%;
  background: rgb(242, 242, 242);
  padding: 13px;
  box-sizing: border-box;
  border-radius: 5px;
}
.input-box {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.input-account {
  width: 100%;
  background: rgb(242, 242, 242);
  padding: 13px 3em;
  box-sizing: border-box;
  border-radius: 5px;
}

.icon-clear,
.btn-verify {
  cursor: pointer;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 77, 218, 0.5);
}

.verify-icon {
  font-size: 14px;
  color: rgba(0, 77, 218, 0.5);
  position: absolute;
  left: 0.5em;
  top: 50%;
  transform: translateY(-50%);
}
</style>