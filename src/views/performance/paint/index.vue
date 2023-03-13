<template>
  <div class="container-fluid p-4">
    <div class="row-title">
                <div class="fw-bold fs-4">页面渲染性能分析</div>
                <div class="block">
                    <BaseTimePicker/>
                </div>
                </div>

    <div class="row">
      <div class="col-md-5 mb-3">
        <h6>页面渲染耗时分段</h6>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button class="btn btn-primary active" type="button">小于1秒</button>
          <button class="btn btn-primary" type="button">1-5秒</button>
          <button class="btn btn-primary" type="button">5-10秒</button>
          <button class="btn btn-primary" type="button">10-30秒</button>
          <button class="btn btn-primary" type="button">大于30秒</button>
        </div>
        <div class="w-100 h-50">
          <ul
            class="
              list-inline
              h-100
              text-center
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <li class="list-inline-item">
              <span class="fs-2 p-1">50</span>数量
            </li>
            <li class="list-inline-item">
              <span class="fs-2 p-1">0.01%</span> 百分比
            </li>
            <li class="list-inline-item">
              <span class="fs-2 p-1">08-16</span> 日期
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7 mb-3">
        <!-- h-100 -->
        <h6>30天变化趋势 <small>（点击切换其他日期）</small></h6>
        <div class="chart-box">
          <MCharts :option="option1" style="width: 100%; height: 180px" />
        </div>
      </div>
    </div>

      <div class="card">
        <div  class="card-header d-flex 
              align-items-center
              justify-content-between">
            <div>接口列表（点击查看接口详情）</div>
            <div class="float-end">
                <MDropDown name="下拉3" @select="tapselect"></MDropDown>
            </div>
        </div>
        <div class="card-body">
          <div class="row">
            
            <div class="col-md-4 mb-3">
              <div class="list-group">
                <a
                  href="#"
                  class="list-group-item list-group-item-action active"
                  aria-current="true"
                >
                  https://www.test.com/mcl/ltv/application/promote/query (85)
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
                <a href="#" class="list-group-item list-group-item-action"
                  >https://www.test.com/mcl/ltv/application/promote/query
                  (85)</a
                >
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">平均网络耗时</h5>
                      <p class="card-text">19.37s</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">影响用户</h5>
                      <p class="card-text">2</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">发生页面</h5>
                      <p class="card-text">4</p>
                    </div>
                  </div>
                </div>
              </div>
              <br /><br /><br />
              <h5>渲染计时(ms)</h5>
              <div class="card-body">
                  <MCharts :option="option3" style="width: 100%; height: 200px" />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import BaseTimePicker from "@/components/BaseTimePicker/index.vue";
import MCharts from "@/components/MCharts/MCharts.vue";
import { option1, option2, option3 } from "./option.js";
function tapselect(){}
</script>

<style scoped>
.btn-group {
  height: 3rem;
}
.btn-group .active {
  background: #2ed796;
}
.list-group a:nth-child(2n){
    background: #f0f0f0;
}
.list-group .active{
    background: #2ed796;
    
}

.page-list .row{
    padding: .5rem 0;
}
.page-list .row:nth-child(2n){
    background: #f0f0f0;
}
</style>