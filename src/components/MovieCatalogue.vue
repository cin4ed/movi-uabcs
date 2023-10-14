<script>
    import { createApp } from 'vue';
    import CarouselObj from './CarouselM.vue';
    const app = createApp();
    export default{
        name:"MovieList",
        components:{
            CarouselObj,
        },
        data(){
            return {
                movieData: null, // Se usa para almacenar la informacion del request realizado
                loading: true, // Se tiene por default en true para mostrar la carga de la solicitud
                error: null, //Dependiendo del resultado de la solicitud cambia su estado
                overlay: false,
                SessionKey: '',
                allPopularLinks: ['https://api.themoviedb.org/3/trending/all/day?language=es-MX&api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/all/week?language=es-MX&api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
                allPopularTime: ['Populares del día','Populares de la semana'],

                moviePopularLinks: ['https://api.themoviedb.org/3/trending/movie/day?language=es-MX&api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/movie/week?language=es-MX&api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
                moviePopularTime: ['Peliculas TOP del día','Peliculas de TOP la semana'],

                trailerLinks: ['https://api.themoviedb.org/3/trending/all/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/tv/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1&api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/tv/on_the_air?language=es-MX&page=1&api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
                trailerHeaders: ['Popular','En TV','En cines', 'Streaming'],
            };
        },
        mounted(){
            if(localStorage.getItem('username') === null){
                this.$router.push('/login/');
            }
        }
    }
</script>

<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding: 20px 0px;">
        <!-- Si se deja un v-else despues de un v-if funciona como else del if anterior -->
        <CarouselObj :title="allPopularTime" :request="this.allPopularLinks" :video="false"></CarouselObj>
        <CarouselObj :title="moviePopularTime" :request="this.moviePopularLinks" :video="false"></CarouselObj>
        <CarouselObj :title="trailerHeaders" :request="this.trailerLinks" :video="true"></CarouselObj>
    </div>
</template>

<style>
</style>