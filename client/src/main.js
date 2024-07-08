import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import {createDiscreteApi} from 'naive-ui'
import { router } from './common/router'
import { createPinia } from 'pinia'
import axios from 'axios'
import { AdminStore } from './store/AdminStore'

// 访问地址时自动补全
axios.defaults.baseURL = "http://localhost:3000"
const { message, notification, dialog } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)
app.provide("axios", axios)//提供全局然后imject注入这样写同时为message的提示框防止在app。vue中多层嵌套
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", axios.defaults.baseURL)//为富文本功能上传图片提供一个服务端地址
//axios
//pinia
//sass
//vue-router
//naive-ui 
//wangeditor
app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')

const adminStore = AdminStore()
//axios拦截器
axios.interceptors.request.use((config)=>{
    //每次请求都优先执行在headers中添加token
    config.headers.token = adminStore.token//给congfig请求头添加一个token这个token来自于adminStore
    return config
})