<template>
  <nav class="navbar navbar-expand-lg navbar-light navigator">
    <div class="container-fluid">
      <img src="/img/a.svg" alt="icon" />
      <a class="navbar-brand title" href="#">CyanSky前端监控系统</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'index' }"
              >首页</router-link
            >
          </li>
          <li class="nav-item" v-if="projectStore.online && userStore.isOnline">
            <router-link class="nav-link" :to="{ name: 'home' }"
              >概览</router-link
            >
          </li>
          <li class="nav-item" v-if="projectStore.online && userStore.isOnline">
            <router-link class="nav-link" :to="{ name: 'user' }"
              >用户</router-link
            >
          </li>
          <li
            class="nav-item dropdown"
            v-if="projectStore.online && userStore.isOnline"
          >
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
              >错误</a
            >
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'errorStat' }"
                  >错误统计</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'errorApi' }"
                  >API错误统计</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'errorResource' }"
                  >静态资源错误统计</router-link
                >
              </li>
            </ul>
          </li>

          <li
            class="nav-item dropdown"
            v-if="projectStore.online && userStore.isOnline"
          >
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
              >性能</a
            >
            <ul class="dropdown-menu">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'apiPerformance' }"
                  >接口耗时分析</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'pagePerformance' }"
                  >页面性能分析</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link btn-admin"
              :to="{ name: 'managerSetting' }"
              v-if="userStore.getLoginStatus"
              >青</router-link
            >
            <router-link class="nav-link" :to="{ name: 'login' }" v-else
              >登录</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { useProjectStore } from "@/store/project";

const userStore = useUserStore();
const projectStore = useProjectStore();
</script>

<style scoped>
.dropdown-menu{
    left: auto;
    right: 0;
}
.navigator {
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 3%), 0 2px 5px 1px rgb(0 0 0 / 5%);

  z-index: 10;
}
.title {
  margin-left: 5px;

  font-weight: 800;
  font-size: 23px;
  /* color: white; */
}
.nav-link:hover {
  color: #21d48f;
}
.btn-admin {
  background: #21d48f;
  padding: 5px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
}
.btn-admin:hover {
  color: #0d6efd;
}
</style>