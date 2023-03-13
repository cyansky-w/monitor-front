<template>
  <div class="container-fluid">
    <div class="row justify-content-between my-3 fs-6 head-filter">
      <div class="col-4">
        <router-link class="btn btn-primary px-3 py-2 d-inline-block" to="/settings?isCreate=1">+ 创建应用</router-link>
      </div>
      <div class="col-8 ">
        <div class="d-flex justify-content-end align-items-center">
          <MDropDown name="环境" :menuList="dict.envLisit"></MDropDown>
          <MDropDown name="健康状态" :menuList="dict.statusLisit" @select="tapselect"></MDropDown>
          <div class="input-group flex-nowrap w-auto">
            <input type="text" class="form-control " placeholder="Username" aria-label="Username"
              aria-describedby="addon-wrapping">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
          </div>
          <div @click="changeToGrid"><i class="bi page-grid" :class="[isGrid ? 'bi-grid-fill active' : 'bi-grid']"></i>
          </div>
          <div @click="changeToList"><i class="bi page-list bi-list" :class="{ 'active': !isGrid }"></i></div>
        </div>
      </div>
    </div>
    <div class="row gx-2" v-if="userStore.isOnline">
      <div class="col-4 pb-2" v-for="(item,index) in userStore.getProjectList" :key="item.projectId">
        <IndexCard :projectName="item.name" :active-user="item.activeUser" :heath-info="item.healthInfo" :heath-score="item.score" :user-info="item.userInfo" :project-id="item.projectId" :index="index"  :option="item.option"></IndexCard>
      </div>
    </div>
    <div class="text-center" v-else>
      <img src="/src/assets/img/noData.webp" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import MDropDown from "@/components/MDropDown/MDropDown.vue";
import IndexCard from "@/components/IndexCard/IndexCard.vue"
import { reactive, ref } from "vue";
import { option } from './mid/optionIndex.js'
import dict from './mid/dict'
import {useUserStore} from '@/store/user'
const userStore = useUserStore();
let isGrid = ref(true);
function changeToGrid() {
  isGrid.value = true;
}

function changeToList() {
  isGrid.value = false;
}

function tapselect(e:{name:string,value:string|number}){
  console.log(e)
}
</script>

<style scoped lang="scss">

.head-filter {
  font-size: .8em
}

.head-filter * {
  font-size: .8rem
}

.page-grid {
  padding-left: .5rem;
  font-size: 1.4rem;
}


.page-list {
  padding-left: .2rem;
  font-size: 1.9rem;
}

.page-list,
.page-grid {
  color: #8c9090;
}

.page-list.active,
.page-grid.active {
  color: #2ed796;
}

</style>