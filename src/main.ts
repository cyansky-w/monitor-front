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
import "@/assets/css/iconfont.css";


import { createPinia } from 'pinia'

import monitor from 'cyansky-monitor'
monitor.setconfig({
   firstScreen:true,
   resource:true,
   api:true,
   blank:true,
   spa: true,
   pid:'awdafgawdfagrtdhgdrtg',
   production:'dev'
});
monitor.useMonitor();

const app=createApp(App);



 app.use(router)
    .use(ElementPlus)
    .use(createPinia())
    .mount('#app')
