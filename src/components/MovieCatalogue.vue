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
                SessionKey: '',
                allPopularLinks: ['https://api.themoviedb.org/3/trending/all/day?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/all/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
                allPopularTime: ['Populares del día','Populares de la semana'],

                moviePopularLinks: ['https://api.themoviedb.org/3/trending/movie/day?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/movie/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
                moviePopularTime: ['Peliculas TOP del día','Peliculas de TOP la semana'],
            };
        },
        mounted(){
            console.log(localStorage.getItem('username'));
            if(localStorage.getItem('username') === null){
                this.$router.push('/login/');
            }
        }
    }
</script>

<template>
    <div class="main-container">
        <div v-if="loading" class="loading-screen">Cargando...</div>
        <!-- Si se deja un v-else despues de un v-if funciona como else del if anterior -->
        <p v-else>Main</p>
        <!-- No kenneth, no lo voy a dejar así, estoy probando cosas -->
        <CarouselObj :title="allPopularTime" carouselID="carousel-1" :request="this.allPopularLinks"></CarouselObj>
        <CarouselObj :title="moviePopularTime" carouselID="carousel-2" :request="this.moviePopularLinks"></CarouselObj>
        <div v-if="error" class="error-message"><h1>{{ error }}</h1></div>
    </div>
</template>

<style scoped>

</style>