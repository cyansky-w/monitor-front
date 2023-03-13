import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home/homeView.vue';
import JsView from '../views/test/js.vue';
import NetworkView from '../views/test/network.vue';
import IndexView from '@/views/index/index.vue'
import SettingsView from '../views/settings/settings.vue';

const routes = [
    //home
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      redirect:"/home/overView",
      children:[
        {
          path:"/home/overView",
          name:"overview",
          component:() => import("@/views/home/overview/index.vue")
        },
        {
          path:"/home/health",
          name:"health",
          component:() => import("@/views/home/health/index.vue")

        },
        {
          path: "/home/performance",
          name:"performance",
          component:() => import("@/views/home/performance/index.vue")
        },
        {
            path:"/home/map",
            name:"map",
            component:() => import("@/views/home/map/index.vue")

        }
      ]
    },
    //setting
    {
      path:"/settings",
      name:"settings",
      component:SettingsView
    },
    //test
    {
      path: '/test',
      name:"test",
      // 如果是根目录的话重定向到overview
      redirect:"/test/js",
      children:[
        {
          path: '/test/js',
          name: 'JsView',
          component: JsView
      }, 
      {
          path: '/test/network',
          name: 'NetworkView',
          component: NetworkView
      }, 
      ]
    },
    //performance
    {
      path: '/performance',
      name:"performancePage",
      redirect:"/performance/api",
      children:[
        {
          path: '/performance/api',
          name: 'apiPerformance',
          component:() => import("@/views/performance/api/index.vue")
      }, 
      {
          path: '/performance/page',
          name: 'pagePerformance',
          component:() => import("@/views/performance/page/index.vue")
      }, 
      {
        path: '/performance/paint',
        name: 'paintPerformance',
        component:() => import("@/views/performance/paint/index.vue")
    }, 
      ]
    },
    //error
    {
      path: '/error',
      name: 'errorStat',
      isHide: true, 
      component: () => import("../views/errorStat/error/index.vue"),
      redirect: "/error/overview",
      children: [
        {
          path: "/error/overview",
          name: "error_overview",
          component: () => import("../views/errorStat/error/overview.vue"),
        },
        {
          path: "/error/list",
          name: "error_list",
          component: () => import("../views/errorStat/error/list.vue"),
        },
      ]
    },
    //errorApi
    {
      path: '/errorApi',
      name: 'errorApi',
      isHide: true, 
      component: () => import("../views/errorStat/api/index.vue"),
      redirect: "/apiError/overview",
      children: [
        {
          path: "/apiError/overview",
          name: "apiError_overview",
          component: () => import("../views/errorStat/api/overview.vue"),
        },
        {
          path: "/apiError/list",
          name: "apiError_list",
          component: () => import("../views/errorStat/api/list.vue"),
        },
      ]
    },
    //errorResource
    {
      path: '/errorResource',
      name: 'errorResource',
      isHide: true, 
      component: () => import("../views/errorStat/resource/index.vue")
    },
    //user
    {
      path: '/user',
      name: 'user',
      redirect:"/user/list",
      children: [
        {
          path: "/user/list",
          name: "userList",
          component: () => import("@/views/user/list.vue"),
        },
        {
          path: "/user/detail",
          name: "userDetail",
          component: () => import("@/views/user/detail.vue")
        },
      ]
    }, 
    //manager
    {
      path: '/manager',
      name: 'manager',
      redirect:"/manager/login",
      children: [
        {
          path: "/manager/login",
          name: "login",
          component: () => import("@/views/manager/login.vue"),
        },
        {
          path: '/manager/setting',
          name: 'managerSetting',
          component: () => import("@/views/manager/setting/index.vue"),
          redirect:"/manager/setting/info",
          children: [
            {
              path: "/manager/setting/info",
              name: "managerInfo",
              component: () => import("@/views/manager/setting/info.vue"),
            },
            {
              path: "/manager/setting/team",
              name: "teamInfo",
              component: () => import("@/views/manager/setting/team.vue"),
            },
          ]
        }
      ]
    },
    //index
    {
      path: '/',
      // 如果是根目录的话重定向到overview
      redirect:"/index",
      children:[
        {
          path:"/index",
          name:"index",
          component:IndexView
        },
      ]
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router

// const router = createRouter({
//     history: createWebHistory(
//         import.meta.env.BASE_URL),
//     routes: [  {
//             path: '/',
//             name: home,
//             component:HomeView
//             //redirect 是重新定向
//             // redirect: '/test/network'
//         },
//         {
//             path: '/test/js',
//             name: 'JsView',
//             component: JsView
//         }, {
//             path: '/test/network',
//             name: 'NetworkView',
//             component: NetworkView
//         }, 

//     ]
// })

// export default router