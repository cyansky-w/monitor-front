<template>
  <div class="user-detai-container">
    <div class="card mb-3">
        <div class="card-header">
            <div class="d-inline-block p-2">用户详情</div>
            <div class="float-end">
                <el-date-picker
                    v-model="queryParams.timestamp"
                    type="datetime"
                    placeholder="选择时间"
                    :default-value="new Date()"
                />
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <h5>用户基本信息</h5>
                    <p>用户标识：</p>
                    <p>设备信息：</p>
                    <p>系统版本：</p>
                    <p>网络地址：</p>
                    <p>所在地区：</p>
                </div>
                <div class="col">
                    <h5>页面平均加载时间</h5>
                    <MCharts :option="option1" height="80%"/>
                </div>
                <div class="col">
                    <h5>用户基本信息</h5>
                    <MCharts :option="option1"  height="80%"/>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <div class="d-inline-block p-2">用户行为记录</div>
            <div class="float-end">
                <m-drop-down></m-drop-down>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-8 list-container">
                    <div class="list-item" v-for="item in 10" :key="item" :class="{'active':item===6}">
                        <div class="operation-icon">
                            <svg width="2.5rem" height="2.5rem" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" focusable="false" class=""><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h40v40H0z"></path><path d="M27.965 16.936v-4.607a.324.324 0 00-.324-.324h-15.31a.324.324 0 00-.324.324v4.607h15.958zm0 2H12.007v8.725a.324.324 0 00.324.324h15.31a.324.324 0 00.324-.324v-8.725zm2 8.725a2.324 2.324 0 01-2.324 2.324h-15.31a2.324 2.324 0 01-2.324-2.324V12.329a2.324 2.324 0 012.324-2.324h15.31a2.324 2.324 0 012.324 2.324v15.332zM14.25 13a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill="#31C9CC" fill-rule="nonzero"></path></g></svg>
                        </div>
                        <div class="operation-info">
                            <div class="d-inline-block">
                                <p>页面浏览</p>
                                <p>https://www.webfunny.cn/</p>
                            </div>
                            
                            <p class="float-end">00:07:56</p>
                        </div>
                    </div>
                </div>
                <div class="col-4 operation-detail-container">
                    <div class="operation-detail">
                        <div class="operation-detail-item">
                            <h5>
                                事件类型:
                            </h5>
                            <p>
                                页面浏览
                            </p>
                            <h5>
                                发生时间：
                            </h5>
                            <p>
                                2021-08-21 00:04:56.458
                            </p>
                            <h5>
                                事件内容：
                            </h5>
                            <p>
                                https://www.webfunny.cn/
                            </p>
                            <h5>
                                发生页面：
                            </h5>
                            <p>
                                https://www.webfunny.cn/
                            </p>

                            <h5>
                                加载信息：
                            </h5>
                            <p>
                                （首次加载）（版本号：）（M2011K2C / android 11）
                            </p>
                            <h5>
                                事件标识：
                            </h5>
                            <p>
                                d607f358-2fb3-4c40-bbdf-e2ce13aaa18e-202108210004
                            </p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import MCharts from "@/components/MCharts/MCharts.vue";

import { reactive } from "@vue/reactivity";
import {option1} from "./option"

let queryParams=reactive({
    timestamp:new Date(),
})

</script>

<style scoped>
.user-detai-container{
    padding: 1rem;
}
.list-container{
    overflow-y: scroll;
    height: 45vh;
}
.list-item{
    display: flex;
    align-items: start;
    padding-bottom: 1rem;
    position: relative;
}
.list-item.active .operation-info{
    background: rgb(46, 215, 150,.4);
}
.operation-info{
    box-sizing: border-box;
    padding: 0 1rem;
    width: 100%;
    background: #f0f0f0;
    border-radius: 1rem;
}
.operation-info p{
    margin: .5rem 0;
}
.list-item:not(:last-child)::after{
    content: '';
    height: 50%;
    position: absolute;
    left: 1.25rem;
    bottom: .5rem;
    box-sizing: border-box;
    border-right:1px solid #aaa;
}
.operation-detail-container{
    box-sizing: border-box;
    padding: .5rem;
}
.operation-detail{
    box-sizing: border-box;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    height:100%;
}
.operation-detail h5{
    font-size:.9rem ;
}
.operation-detail p{
    color: #666;
    font-size:.8rem ;
}
.operation-detail p:last-child{
    margin: 0;
}
</style>