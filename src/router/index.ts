import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/pages/home/homeView.vue';
import JsView from '../views/test/js.vue';
import NetworkView from '../views/test/network.vue';
import IndexView from '@/views/pages/index/index.vue'
import SettingsView from '../views/pages/settings/settings.vue';

const routes = [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      // 如果是根目录的话重定向到overview
      redirect:"/home/overView",
      children:[
        {
          path:"/home/overView",
          name:"overview",
          component:() => import("@/views/pages/home/overview/index.vue")
        },
        {
          path:"/home/health",
          name:"health",
          component:() => import("@/views/pages/home/health/index.vue")

        },     
        {
            path:"/home/performance",
            name:"performance",
            component:() => import("@/views/pages/home/performance/index.vue")

        },      
        {
            path:"/home/map",
            name:"map",
            component:() => import("@/views/pages/home/map/index.vue")

        }
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
      path: '/performance',
      name:"test",
      redirect:"/performance/api",
      children:[
        {
          path: '/performance/api',
          name: 'apiPerformance',
          component:() => import("@/views/pages/performance/api/index.vue")
      }, 
      {
          path: '/performance/page',
          name: 'pagePerformance',
          component:() => import("@/views/pages/performance/page/index.vue")
      }, 
      ]
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
      path: '/errorApi',
      name: 'errorApi',
      isHide: true, 
      component: () => import("../views/pages/errorStat/error/index.vue"),
      redirect: "/errorApi/overview",
      children: [
        {
          path: "/errorApi/overview",
          name: "errorApi_overview",
          component: () => import("../views/pages/errorStat/api/overview.vue"),
        },
        {
          path: "/errorApi/list",
          name: "errorApi_list",
          component: () => import("../views/pages/errorStat/api/list.vue"),
        },
      ]
    },
    {
      path: '/errorResource',
      name: 'errorResource',
      isHide: true, 
      component: () => import("../views/pages/errorStat/resource/index.vue")
    },
    {
      path: '/user',
      name: 'user',
      redirect:"/user/list",
      children: [
        {
          path: "/user/list",
          name: "userList",
          component: () => import("@/views/pages/user/list.vue"),
        },
        {
          path: "/user/detail",
          name: "userDetail",
          component: () => import("@/views/pages/user/detail.vue"),
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