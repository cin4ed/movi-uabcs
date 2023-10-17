import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

// Route components
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Actors from './components/ActorsCatalogue.vue';
import Serie from './components/Serie.vue';
import MovieDetails from './components/MovieDetails.vue';
import ActorsDetails from "./components/ActorsDetails.vue";
import SeasonDetails from "./components/SeasonDetails.vue";

// Define routes
const routes = [
    { path: '/', component: Home, },
    { path: '/index', component: Home, },
    { path: '/login', component: Login, },
    { path: '/actors/', component: Actors},
    { path: '/serie/:id', component: Serie },
    { path: '/SeasonDetails', component: SeasonDetails },
    { path: '/movie/:id', component: MovieDetails },
    { path: "/actor/:id", component: ActorsDetails },
];

// Create router instance and pass the routes
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

const app = createApp(App);

// Variables globales
app.config.globalProperties.API_KEY = '6a71a113dddd8d476e8b8e07db83bb9d';

//Esta es la manera de declarar variables gloables:
/* app.config.globalProperties.$APIHeaders = {
    headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcxYTExM2RkZGQ4ZDQ3NmU4YjhlMDdkYjgzYmI5ZCIsInN1YiI6IjY1MTlkOTY1MDcyMTY2MDEzOWM1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fvwRaFzNROAhNcfeY1qE_fR1eUi4rKTly4QCrm8u-C4',
        'accept': 'application/json',
        'content-type': 'application/json'
    }
}; */

app.use(router);
app.mount('#app');
