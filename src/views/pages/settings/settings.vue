<template>
    <div class=" bg-light py-4">
        <div class="container-xl rounded-3 bg-white py-3">
            <div class="setting-content  border-bottom pb-3">
                <div class="d-flex justify-content-between">
                    <div class="fs-4 fw-bold">
                        设置
                    </div>
                    <div class="fw-bold">
                        <button class="btn btn-primary px-2 py-1 " @click="onSave">保存</button>
                        <button class="btn btn-danger px-2 py-1 ms-3" @click="onDelete">删除</button>
                    </div>
                </div>
            </div>
            <div class="setting-content form">
                <div class="fs-6 pb-3 fw-bold">基本信息</div>
                <div class="mb-3 row">
                    <label for="projectName" class="require col-sm-2 col-form-labe">应用名称</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="projectName" v-model="baseInfo.name">
                    </div>
                </div>
                <div class="alert alert-danger m-0" role="alert" v-show="alert">应用名称不能为空</div>
                <div class="mb-3 row">
                    <label for="createTime" class="col-sm-2 col-form-label">创建时间</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control-plaintext" readonly id="createTime" v-model="baseInfo.createTime">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="projectId" class="col-sm-2 col-form-label">应用Id</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control-plaintext" readonly id="projectId" v-model="baseInfo.projectId">
                    </div>
                </div>
            </div>
            <div class="setting-content form">
                <div class="fs-6 pb-3 fw-bold">应用配置</div>
                <div class="mb-3 row" v-for="(configItem, configIndex) in configList" :key="configItem.value">
                    <label for="createTime" class="col-sm-2 col-form-label">{{ configItem.name }}</label>
                    <div class="col-sm-10  d-flex align-items-center">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" :id="`config_${configItem.value}`"
                                @click="checkConfig(configIndex)">
                            <label class="form-check-label" :for="`config_${configItem.value}`">{{
                                    configItem.describe
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">配置代码</label>
                    <div class="col-sm-10">
                        <textarea name="" id="" cols="30" rows="10" placeholder="配置代码" class="setting-code" v-model="configStr">
                        </textarea> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "vue";
let configList = reactive([{
    name: "首屏指标",
    describe: "开启此选项后，将采集首屏FP，FCP，FMP，LCP数据",
    value: 'firstScreen',
    checked: false
},
{
    name: "资源监听",
    describe: "开启此选项后，实时上报页面加载的静态资源。",
    value: 'resource',
    checked: false
},
{
    name: "api上报",
    describe: "开启此选项后，实时上报页面请求相关数据。",
    value: 'api',
    checked: false
},
{
    name: "白屏上报",
    describe: "开启此选项后，上报页面渲染白屏数据。",
    value: 'blank',
    checked: false
},
{
    name: "SPA模式",
    describe: "开启此项后，会开启对路由变化监控，上报针对单页面应用不同页面。",
    value: 'spa',
    checked: false
}])

let baseInfo=reactive({
    name:'应用名称',
    projectId:'wdafawdfawdaw',
    createTime:new Date(),
});
let configStr=computed(()=>{
    let configStr="import monitor from '@/utils/monitor/index.js'\nmonitor.setconfig({";
    for(let configItem of configList){
        configStr+=`\n${configItem.value} : ${configItem.checked},`;
    };
    configStr+=`\nproduction:'dev'\n});\nmonitor.useMonitor();`
    return configStr;
})

function checkConfig(index: number) {
    configList[index].checked = !configList[index].checked
}
let alert=ref(false);
function onSave(){
    if(!baseInfo.name){
        alert.value=true;
    }else{
        alert.value=false;
    }
}

</script>

<style lang="scss">
.setting-content {
    padding: 1rem 8rem;
}
.setting-code{
    width: 100%;
    height: 10rem;
    border: none;
    background: #fafafa;
}
.require{
    position: relative;
}
.require::after{
    content: '*';
    position: absolute;
    left: 0;
    top: 0;
    color:red;    
}
</style>