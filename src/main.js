import './assets/main.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';

// Route components
import Index from './components/MovieCatalogue.vue';
import Login from './components/Login.vue';
//import Serie from './components/Serie.vue';
import Actors from './components/ActorsCatalogue.vue';

// Define routes
const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/index/', component: Index },
    //{ path: '/serie/:id', component: Serie },
    { path: '/actors', component: Actors},
];

// Create router instance and pass the routes
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

const app = createApp(App);

app.use(router);
app.mount('#app');
