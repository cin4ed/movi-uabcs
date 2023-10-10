import './assets/main.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';

// Route components
import Index from './components/MovieCatalogue.vue';
import Login from './components/Login.vue';
import Serie from './components/Serie.vue';

// Define routes
const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/index/', component: Index },
    { path: '/serie/:id', component: Serie },
];

// Create router instance and pass the routes
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

const app = createApp(App);
//Esta es la manera de declarar variables gloables:
app.config.globalProperties.$APIHeaders = {
    headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcxYTExM2RkZGQ4ZDQ3NmU4YjhlMDdkYjgzYmI5ZCIsInN1YiI6IjY1MTlkOTY1MDcyMTY2MDEzOWM1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fvwRaFzNROAhNcfeY1qE_fR1eUi4rKTly4QCrm8u-C4',
        'accept': 'application/json',
        'content-type': 'application/json'
    }
};
//Y para llamarlas desde cualquier componente, se hace así:
// {{ this.$variable }}
//Cómo si de una variable local se estuviera tratando.

app.use(router);
app.mount('#app');
