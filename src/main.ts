import { createApp } from 'vue'
// import './style.scss'
// import './index.css'
import App from './App.vue'
import router from './router/index'
import 'jquery'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap-icons/font/bootstrap-icons.css'

// createApp(App).use(router).use(ElementPlus).mount('#app')
// //网络请求api
// import ApiService from '@/service/api.service.js';


import monitor from '@/utils/monitor/index.js'
monitor.setconfig({
   firstScreen:true,
   resource:true,
   api:true,
   blank:true,
   hash:true,
   history:true,
   pid:'awdafgawdfagrtdhgdrtg',
   production:'dev'
});
monitor.useMonitor();

const app=createApp(App);
 app.use(router)
    .use(ElementPlus)
    .mount('#app')
