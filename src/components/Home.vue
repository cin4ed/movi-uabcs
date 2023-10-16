<script>
import { resolveTransitionHooks } from 'vue';
import Slider from './Slider.vue';
import axios from 'axios';

export default {
    data() {
        return {
            popularMovies: [],
            popularSeries: []
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
        }
    },
    components: {
        Slider,
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
        <Slider :items="popularMovies" />
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
        <Slider :items="popularSeries" />
    </div>
</template>

<style scoped>
.banner {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('movies-banner.jpeg');
    padding: 2rem 0;
}

@media (min-width: 1200px) {
    .banner {
        height: 450px;
    }
}
</style>