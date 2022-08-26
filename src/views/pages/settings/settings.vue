<template>
    <div class=" bg-light py-4">
        <div class="container-xl rounded-3 bg-white py-3">
            <div class="setting-content  border-bottom pb-3">
                <div class="d-flex justify-content-between">
                    <div class="fs-4 fw-bold">
                        设置
                    </div>
                    <div class="fw-bold">
                        <button class="btn btn-primary px-2 py-1 ">保存</button>
                        <button class="btn btn-danger px-2 py-1 ms-3">删除</button>
                    </div>
                </div>
            </div>
            <div class="setting-content form">
                <div class="fs-6 pb-3 fw-bold">基本信息</div>
                <div class="mb-3 row">
                    <label for="projectName" class="col-sm-2 col-form-label fs-m">应用名称</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="projectName">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="createTime" class="col-sm-2 col-form-label">创建时间</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control-plaintext" readonly id="createTime">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="projectId" class="col-sm-2 col-form-label">应用Id</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control-plaintext" readonly id="projectId">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">创建团队</label>
                    <div class="col-sm-10 d-flex align-items-center">
                        <div class="form-check me-3" v-for="(item, index) in productionList" :key="item.value">
                            <input class="form-check-input" type="checkbox" :checked="item.checked"
                                :id="`production_${item.value}`">
                            <label class="form-check-label" :for="`production_${item.value}`" @click="checkProd(index)">
                                {{ item.name }}{{ item.checked }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="setting-content form">
                <div class="fs-6 pb-3 fw-bold">应用配置</div>
                <div class="mb-3 row" v-for="(item, index) in configList" :key="item.value">
                    <label for="createTime" class="col-sm-2 col-form-label">{{ item.name }}</label>
                    <div class="col-sm-10  d-flex align-items-center">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" :id="`config_${item.value}`"
                                @click="checkConfig(index)">
                            <label class="form-check-label" :for="`config_${item.value}`">{{
                                    item.describe
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label for="createTime" class="col-sm-2 col-form-label">SPA路由解析</label>
                    <div class="col-sm-10 d-flex align-items-center">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" :id="`config_spa`" :checked="spaFlag"
                                @click="spaFlag = !spaFlag" data-bs-toggle="collapse" href="#collapseExample"
                                role="button">
                            <label class="form-check-label"
                                :for="`config_spa`">开启此项后，会监听页面的hashchange事件/popstate事件上报PV路由信息，适用于SPA应用场景</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="createTime" class="col-sm-2"></label>
                    <div class="col-sm-10 d-flex align-items-center">
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body py-1">
                                <div class="row">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch"
                                            :id="`config_hash`" :checked="hashFlag" @click="hashFlag = !hashFlag">
                                        <label class="form-check-label"
                                            :for="`config_hash`">hash模式(监听hashchange事件)</label>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch"
                                            :id="`config_history`" :checked="historyFlag"
                                            @click="historyFlag = !historyFlag">
                                        <label class="form-check-label"
                                            :for="`config_history`">history模式(监听popstate事件)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";

let productionList = reactive([{
    name: "开发（dev）",
    value: "dev",
    checked: true
},
{
    name: "测试（sit）",
    value: "sit",
    checked: true
},
{
    name: "预发布（stag）",
    value: "stag",
    checked: true
},
{
    name: "生产（prod）",
    value: "prod",
    checked: true
}])
let configList = reactive([{
    name: "首屏指标",
    describe: "开启此选项后，将采集首屏FP，FCP，FMP，LCP数据",
    value: 0,
    checked: true
},
{
    name: "资源监听",
    describe: "开启此选项后，实时上报页面加载的静态资源。",
    value: 1,
    checked: true
},
{
    name: "api上报",
    describe: "开启此选项后，实时上报页面请求相关数据。",
    value: 2,
    checked: true
},
{
    name: "白屏上报",
    describe: "开启此选项后，上报页面渲染白屏数据。",
    value: 3,
    checked: true
}])

let spaFlag = ref(true);
let hashFlag = ref(true);
let historyFlag = ref(true);


function checkProd(index: number) {
    productionList[index].checked = !productionList[index].checked
}
function checkConfig(index: number) {
    configList[index].checked = !configList[index].checked
}
</script>

<style lang="scss">
.setting-content {
    padding: 1rem 8rem;
}
</style>