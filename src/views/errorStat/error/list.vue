<template>
    <div class="col-md-12">
    <LoadingMask :show="loadingFlag" />
        <div class="card text-black bg-light h-100">
            <div class="card-body">
                <p>全部错误</p>
                <el-table :data="tableData" style="height: 500px">
                    <el-table-column prop="error" label="错误信息" min-width="200">
                    </el-table-column>
                    <el-table-column prop="file" label="发生文件" min-width="200">
                    </el-table-column>
                    <el-table-column prop="position" label="发生位置" min-width="200">
                    </el-table-column>
                    <el-table-column prop="stack" label="错误栈信息" min-width="200">
                    </el-table-column>
                    <el-table-column prop="element" label="发生元素" min-width="200">
                    </el-table-column>
                </el-table>
                <Pagination
                v-show="total>0"
                :total="total"
                :page="queryParams.pageNum"
                :limit="queryParams.pageSize"
                @pagination="getList"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Pagination from "@/components/Pagination/index.vue";
import LoadingMask from "@/components/LoadingMask/index.vue";
import { reactive, ref } from 'vue';
let tableData=reactive([
    {
        error: "Uncaught TypeError: Cannot set property 'error' of undefined",
        file: "http://127.0.0.1:8080/utils/monitor/lib/longTask.ts",
        position: "13行34",
        stack: "http://127.0.0.1:8080/utils/monitor/lib/longTask.ts:13:34",
        element: "HTML BODY #container .content INPUT"
    },
    {
        error: "Uncaught ReferenceError: observeStatic is not defined",
        file: "http://127.0.0.1:8080/utils/monitor/lib/resource.ts?t=1660803309216",
        position: "3行3",
        stack: "resource (http://127.0.0.1:8080/utils/monitor/lib/resource.ts?t=1660803309216:3:3)^useMonitor (http://127.0.0.1:8080/utils/monitor/index.ts?t=1660803321354:17:3)^http://127.0.0.1:8080/src/main.ts?t=1660803321354:10:1",
        element: "无"
    },
    {
        error: "Uncaught TypeError: Cannot set properties of undefined (setting 'error')",
        file: "http://127.0.0.1:8080/node_modules/.vite/deps/chunk-4TEYBX75.js?v=71e23998",
        position: "1427行7",
        stack: "Proxy.errorClick (http://127.0.0.1:8080/src/views/test/js.vue:7:28)^_createElementVNode.onClick._cache.<computed>._cache.<computed> (http://127.0.0.1:8080/src/views/test/js.vue:45:63)^callWithErrorHandling (http://127.0.0.1:8080/node_modules/.vite/deps/chunk-4TEYBX75.js?v=71e23998:1369:18)^callWithAsyncErrorHandling (http://127.0.0.1:8080/node_modules/.vite/deps/chunk-4TEYBX75.js?v=71e23998:1377:17)^HTMLInputElement.invoker (http://127.0.0.1:8080/node_modules/.vite/deps/chunk-4TEYBX75.js?v=71e23998:7512:7)",
        element: "html body div#app div#container div#content input#errorBtn"
    },
])
            // 总条数
let total=ref(3);
let queryParams=reactive({
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
    materialType: null
})
let loadingFlag = ref(false);
function showLoading() {
  loadingFlag.value = true;
}
function hideLoading() {
  loadingFlag.value = false;
}

function getList(){}
</script>


<style scoped>
</style>