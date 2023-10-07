import './assets/main.css'
import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";

import Index from './components/MovieCatalogue.vue'
import Login from './components/Login.vue'

import App from './App.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/index/', component: Index },
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

const app = createApp(App)
app.use(router)
app.mount('#app')