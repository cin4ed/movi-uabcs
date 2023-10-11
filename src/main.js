import './assets/main.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import MovieCatalogue from './components/MovieCatalogue.vue'; 
import Login from './components/Login.vue';
import Index from './components/MovieCatalogue.vue';
import MovieDetails from './components/MovieDetails.vue';

const app = createApp(App);

app.component('MovieCatalogue', MovieCatalogue);

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/index/', component: Index },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.mount('#app');
