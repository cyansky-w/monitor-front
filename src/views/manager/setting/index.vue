<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <el-menu :router="true" default-active="/manager/setting/info" >
            <el-menu-item index="/manager/setting/info">基本信息</el-menu-item>
            <el-sub-menu>
                <template #title>我的团队</template>
                <el-menu-item  :index="`/manager/setting/team?teamId=${index}`" v-for="(item, index) in userStore.getTeamList" :key="index">{{item.name}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
  
        <!-- ___main___ -->
        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup lang="ts" >
  // import Tabs from '../components/Tabs.vue';
  import { ref } from 'vue';
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  /* #menu-left{
    border-right:0;
  } */
  </style>