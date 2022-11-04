import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/pages/homeView/homeView.vue';
import HealthState from '../views/pages/healthState/healthState.vue';
import PerformanceView from '../views/pages/performanceView/performanceView.vue';
import JsView from '../views/test/js.vue';
import NetworkView from '../views/test/network.vue';
import MapView from '../views/pages/mapView/mapView.vue';
import IndexView from '@/views/pages/index/index.vue'
import JkhsfxView from '../views/pages/jkhsfxView/jkhsfxView.vue';
import YmxnfxView from '../views/pages/ymxnfxView/ymxnfxView.vue';
import SettingsView from '../views/pages/settings/settings.vue';

const routes = [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      // 如果是根目录的话重定向到overview
      redirect:"/home/overview",
      children:[
        {
          path:"/home/overview",
          name:"overview",
          component:() => import("../views/pages/overView/overView.vue")
        },
        {
          path:"/home/healthstate",
          name:"healthstate",
          component: HealthState
        },     
        {
            path:"/home/performance",
            name:"performance",
            component: PerformanceView
        },      
        {
            path:"/home/map",
            name:"map",
            component: MapView
        }
      ]
    },
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
    {
      path:"/settings",
      name:"settings",
      component:SettingsView
    },
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
    {
      path: '/jkhsfx',
      name: 'jkhsfx',
      component: JkhsfxView
    },  
    {
      path: '/ymxnfx',
      name: 'ymxnfx',
      component: YmxnfxView
    },  
    {
      path: '/error',
      name: 'errorStat',
      isHide: true, 
      component: () => import("../views/pages/errorStat/error/index.vue"),
      redirect: "/error/overview",
      children: [
        {
          path: "/error/overview",
          name: "error_overview",
          component: () => import("../views/pages/errorStat/error/overview.vue"),
        },
        {
          path: "/error/list",
          name: "error_list",
          component: () => import("../views/pages/errorStat/error/list.vue"),
        },
      ]
    },
    {
      path: '/errorapi',
      name: 'errorapi',
      isHide: true, 
      component: () => import("../views/pages/errorStat/error/index.vue"),
      redirect: "/errorapi/overview",
      children: [
        {
          path: "/errorapi/overview",
          name: "errorapi_overview",
          component: () => import("../views/pages/errorStat/api/overview.vue"),
        },
        {
          path: "/errorapi/list",
          name: "errorapi_list",
          component: () => import("../views/pages/errorStat/api/list.vue"),
        },
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      redirect:"/manager/login",
      children: [
        {
          path: "/manager/login",
          name: "login",
          component: () => import("../views/pages/manager/login.vue"),
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