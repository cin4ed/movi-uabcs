<script>
import Slider from './Slider.vue';
import CarouselObj from './CarouselM.vue';
import axios from 'axios';

export default {
    data() {
        return {
            popularMovies: [],
            popularSeries: [],
            trailerLinks: ['https://api.themoviedb.org/3/trending/all/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/trending/tv/week?api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=6a71a113dddd8d476e8b8e07db83bb9d',
                                'https://api.themoviedb.org/3/tv/airing_today?page=4&api_key=6a71a113dddd8d476e8b8e07db83bb9d'],
            trailerHeaders: ['Popular','En TV','En cines', 'Streaming'],
        }
    },
    mounted() {
        // Get movies
        axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${this.API_KEY}&page=1`)
            .then(res => this.popularMovies = [...this.popularMovies, ...res.data.results])
            .catch(err => console.error('error: ' + err));

        axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${this.API_KEY}&page=2`)
            .then(res => this.popularMovies = [...this.popularMovies, ...res.data.results])
            .catch(err => console.error('error: ' + err));

        // Get series
        axios.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${this.API_KEY}&page=1`)
            .then(res => this.popularSeries = [...this.popularSeries, ...res.data.results])
            .catch(err => console.error('error: ' + err));

        axios.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${this.API_KEY}&page=2`)
            .then(res => this.popularSeries = [...this.popularSeries, ...res.data.results])
            .catch(err => console.error('error: ' + err));
    },
    methods: {
        getMovieImage(url) {
            return `http://image.tmdb.org/t/p/w500/${url}`;
        },
        goToMovie(id) {
            this.$router.push(`/movie/${id}`);
        },
        goToSerie(id) {
            this.$router.push(`/serie/${id}`);
        }
    },
    components: {
        Slider,
        CarouselObj,
    },
}
</script>

<template>
    <div class="banner d-flex align-items-center">
        <section class="py-5 container justify-content-center">
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <h1 class="text-light">Bienvenido</h1>
                    <p class="lead text-light">Millones de películas, programas de televisión y personas por descubrir.
                        Explora ahora!</p>
                    <!-- TODO: Add search input -->
                    <form class="mb-3 mb-lg-0 me-lg-3 input-group" role="search">
                        <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                        <button id="search-button" type="button" class="btn btn-secondary">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </div>
    <div v-if="this.popularMovies.length > 0">
        <section>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p class="text-uppercase my-3">Películas populares <i class="bi bi-arrow-right-square"></i></p>
                    </div>
                </div>
            </div>
        </section>
        <Slider :items="popularMovies" @item-click="goToMovie" />
    </div>
    <div v-if="this.popularSeries.length > 0">
        <section>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p class="text-uppercase my-3">Series populares <i class="bi bi-arrow-right-square"></i></p>
                    </div>
                </div>
            </div>
        </section>
        <Slider :items="popularSeries" @item-click="goToSerie" />
    </div>
    <div>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p class="text-uppercase my-3">Más... <i class="bi bi-arrow-right-square"></i></p>
                    </div>
                </div>
            </div>
        </section>
        <CarouselObj :title="trailerHeaders" :request="this.trailerLinks" :video="true"></CarouselObj>
    </div>
</template>

<style scoped>
    .banner {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/src/assets/movies-banner.jpeg');
        padding: 2rem 0;
    }

    @media (min-width: 1200px) {
        .banner {
            height: 450px;
        }
    }
</style>