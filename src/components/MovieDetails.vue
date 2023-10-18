
<template>
  <div v-if="movie">
    <!-- Movie information -->
    <section class="container">
      <div class="row pt-3 justify-content-center">
        <div class="col text-center">
          <h1>{{ movie.title }}</h1>
        </div>
      </div>
      <div class="row justify-content-center pt-2">
        <div class="col-8 col-md-3">
          <img class="rounded w-100" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" :alt="movie.title" />
        </div>
      </div>
      <div class="row pt-4">
        <div class="col d-flex justify-content-center gap-4">
          <div class="text-center"><i class="bi bi-star-fill"></i> {{ movie.vote_average }}</div>
          <div class="text-center"><i class="bi bi-calendar-fill"></i> {{ movie.release_date }}</div>
          <div class="text-center"><i class="bi bi-clock-fill"></i> {{ movie.runtime }}</div>
        </div>
      </div>
      <div class="row pt-3 justify-content-center">
        <div class="col-11 text-center">
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </section>
    <!-- Favorite -->
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-11">
          <template v-if="isFavorite">
            <button class="w-100 btn btn-dark" @click="toggleFavorite">
              <i class="bi bi-star"></i> Marcar como favorito
            </button>
          </template>
          <template v-else>
            <button class="w-100 btn btn-dark" @click="toggleFavorite">
              <i class="bi bi-star-fill"></i> Quitar de favoritos
            </button>
          </template>
        </div>
      </div>
    </section>
    <!-- Rating -->
    <section class="container">
      <div class="row justify-content-center pt-3">
        <div class="col-11">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-star-fill"></i></span>
            <select class="form-select" id="rating" v-model="userRating">
              <option selected>Selecciona una calificación</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button class="btn btn-dark" @click="calificarPelicula">Calificar</button>
          </div>
        </div>
      </div>
      <!-- 
        TODO: do we really need this? 

        <div v-if="mostrarCalificaciones">
          <div class="user-ratings">
            <p>Calificación seleccionada por el usuario: {{ userRating || 'No seleccionada' }}</p>
          </div>
        </div>
      -->
    </section>
    <!-- Additional information -->
    <section class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-11">
          <h4>Información adicional</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <table class="table">
            <tr>
              <td>Estado:</td>
              <td class="text-end">{{ movie.status }}</td>
            </tr>
            <tr>
              <td>Idioma original:</td>
              <td class="text-end">{{ movie.original_language }}</td>
            </tr>
            <tr>
              <td>Presupuesto:</td>
              <td class="text-end">{{ formatCurrency(movie.budget) }}</td>
            </tr>
            <tr>
              <td>Ingresos:</td>
              <td class="text-end">{{ formatCurrency(movie.revenue) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <h4>Géneros</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11 d-flex flex-wrap gap-1">
          <!-- TODO: use links instead of spans -->
          <span class="badge text-bg-dark d-inline-block" v-for="genre in movie.genres" :key="genre.id">
            {{ genre.name }}
          </span>
        </div>
      </div>
      <div class="row justify-content-center pt-3">
        <div class="col-11">
          <h4>Palabras clave</h4>
        </div>
      </div>
      <div class="row justify-content-center" v-if="movie.keywords?.length > 0">
        <div class="col-11 d-flex flex-wrap gap-1">
          <!-- TODO: use links instead of spans -->
          <span class="badge text-bg-dark d-inline-block" v-for="keyword in movie.keywords">
            {{ keyword.name }}
          </span>
        </div>
      </div>
    </section>
    <!-- Trailer -->
    <div class="container pt-3" v-if="trailerId">
      <div class="row justify-content-center">
        <div class="col-11">
          <h4>Trailer</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <iframe class="w-100 rounded"
          :src="embedUrl"
          frameborder="0"
          allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <!-- Actors -->
    <section class="container pt-3" v-if="cast.length">
      <div class="row justify-content-center">
        <div class="col-11">
          <h4>Reparto</h4>
        </div>
        <div class="col-11">
          <ActorSlider v-if="cast.length > 0" :actors="cast" />
        </div>
      </div>
    </section>
    <!-- Reseñas -->
    <section class="container pt-3" v-if="reviews.length > 0">
      <div class="row justify-content-center">
        <div class="col-11">
          <h4>Reseñas</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <ReviewSlider :reviews="reviews" />
        </div>
      </div>
        <!-- 
          TODO: para que mas si ya se cargan un chingo
          <button @click="toggleReviewsVisibility" class="show-more-button">
            {{ showAllReviews ? 'Ocultar reseñas' : 'Ver el resto de reseñas' }}
          </button>  
         -->
    </section>
    <!-- Recomendaciones -->
    <!-- <h2>Recomendaciones:</h2>
    <div class="recommendations">
      <div class="recommendations-container">
        <ul class="recommendation-list">
          <li v-for="recommendation in recommendations" :key="recommendation.id">
            <div v-if="recommendation.poster_path" class="recommendation" @click="goToMovieDetails(recommendation.id)">
              <router-link :to="'/movie/' + recommendation.id">
                <img :src="'https://image.tmdb.org/t/p/w185' + recommendation.poster_path" :alt="recommendation.title" />
                <p class="recommendation-title">{{ recommendation.title }}</p>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import ActorSlider from './ActorSlider.vue';
import ReviewSlider from './ReviewSlider.vue';

export default {
  name: 'MovieDetails',
  components: {
    ActorSlider,
    ReviewSlider,
  },
  data() {
    return {
      movie: null,
      cast: [],
      reviews: [],
      showAllReviews: false,
      trailerUrl: '',
      trailerId: null,
      recommendations: [],
      userRating: null,
      isFavorite: false,
      mostrarCalificaciones: false,
    };
  },
  computed: {
    embedUrl() {
      return `https://www.youtube.com/embed/${this.trailerId}`;
    },
    //La imagen de atras dee la peli
    backgroundImageStyle() {
      if (this.movie && this.movie.backdrop_path) {
        const backgroundImageUrl = `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`;
        return {
          'background-image': `url(${backgroundImageUrl})`,
          
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          
        };
      }
      return {};
    },
  },
  created() {
    const movieId = this.$route.params.id;
    this.getMovieRecommendations(movieId);
  },
  mounted() {
    const movieId = this.$route.params.id;
    
    
    this.getMovieDetails(movieId);
    this.getMovieReviews(movieId);
    this.getMovieTrailer(movieId);
    this.getMovieRecommendations(movieId);
  },
  methods: {
    //soli8citud rating
    async calificarPelicula() {
      const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
      const movieId = this.$route.params.id;
      const session_id = localStorage.getItem('sessionKey');
      this.mostrarCalificaciones = true;
      
      if (this.userRating !== null) {
        // Realizar una solicitud al servidor para enviar la calificación
        try {
          await axios.post(
          `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&session_id=${session_id}`,
          {
            value: this.userRating,
            
          }
          );
        } catch (error) {
          console.error('Error al calificar la película:', error);
        }
      }
    },
    //solicitud favorito
    async toggleFavorite() {
      const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
      const movieId = this.$route.params.id;
      const session_id = localStorage.getItem('sessionKey');
      const account_id = localStorage.getItem('sessionID');
      
      if (this.isFavorite) {
        // Si ya es favorita, desmárcala
        try {
          await axios.post(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${apiKey}&session_id=${session_id}`, {
            media_type: 'movie',
            media_id: movieId,
            favorite: false,
          });
          this.isFavorite = false;
          
        } catch (error) {
          console.error('Error al desmarcar la película como favorita:', error);
        }
      } else {
        // Si no es favorita, márcala
        try {
          await axios.post(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${apiKey}&session_id=${session_id}`, {
            media_type: 'movie',
            media_id: movieId,
            favorite: true,
          });
          this.isFavorite = true;
          
        } catch (error) {
          console.error('Error al marcar la película como favorita:', error);
        }
      }
    },
    
    
    
    // Solicitud para obtener detalles
    async getMovieDetails(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`;
        
        const response = await axios.get(apiUrl);
        this.movie = response.data;
        
        this.movie.budget = this.movie.budget || 0;
        this.movie.revenue = this.movie.revenue || 0;
        
        this.getMovieKeywords(movieId);
        
        // Solicitud para obtener actores
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
        const creditsResponse = await axios.get(creditsUrl);
        this.cast = creditsResponse.data.cast;
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    },
    // Solicitud para obtener palabras clave
    async getMovieKeywords(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const keywordsUrl = `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${apiKey}`;
        const response = await axios.get(keywordsUrl);
        this.movie.keywords = response.data.keywords;
      } catch (error) {
        console.error('Error al obtener palabras clave de la película:', error);
      }
    },
    // Solicitud para obtener reviews
    async getMovieReviews(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;
        
        const response = await axios.get(reviewsUrl);
        this.reviews = response.data.results;
        
      } catch (error) {
        console.error('Error al obtener reseñas de la película:', error);
      }
    },
    toggleReviewsVisibility() {
      this.showAllReviews = !this.showAllReviews;
    },
    // Solicitud para obtener el trailer 
    async getMovieTrailer(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=es-MX`;
        const response = await axios.get(videosUrl);
        const videos = response.data.results;
        const spanishTrailer = videos.find(video => video.iso_639_1 === 'es');
        
        // Si se encuentra un tráiler en español
        if (spanishTrailer) {
          this.trailerId = spanishTrailer.key;
        } else {
          // Si no se encuentra un tráiler en español, busca uno en inglés
          const englishTrailer = videos.find(video => video.iso_639_1 === 'en');
          
          if (englishTrailer) {
            this.trailerId = englishTrailer.key;
          } else {
            // Si no hay tráiler en ningún idioma img de ñl poster y "trailer no disponible"
            this.trailerId = null;
            this.posterImage = `https://image.tmdb.org/t/p/w200${this.movie.poster_path}`;
            this.trailerUnavailableMessage = 'Tráiler no disponible';
          }
        }
      } catch (error) {
        console.error('Error al obtener el tráiler de la película:', error);
      }
    },
    // Solicitud para obtener recomendaciones
    async getMovieRecommendations(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=es-MX`;
        
        const response = await axios.get(recommendationsUrl);
        
        if (response.data && response.data.results && response.data.results.length > 0) {
          this.recommendations = response.data.results;
        } else {
          // No hay recomendaciones para esta película, cargar unas peliculas con el mismo genero principal.
          this.loadMoviesWithSameMainGenre(movieId);
        }
      } catch (error) {
        console.error('Error al obtener recomendaciones de películas:', error);
        
      }
    },
    async loadMoviesWithSameMainGenre(movieId) {
      try {
        
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`;
        
        const response = await axios.get(apiUrl);
        const currentMovie = response.data;
        
        if (currentMovie.genres && currentMovie.genres.length > 0) {
          // Obtener el ID del género principal 
          const mainGenreId = currentMovie.genres[0].id;
          
          // buscar pelis con el mismo género principal.
          const similarMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-MX&with_genres=${mainGenreId}`;
          
          const similarMoviesResponse = await axios.get(similarMoviesUrl);
          if (similarMoviesResponse.data && similarMoviesResponse.data.results) {
            this.recommendations = similarMoviesResponse.data.results;
          }
        }
      } catch (error) {
        console.error('Error al cargar películas con el mismo género principal:', error);
        
      }
    },
    // Solicitud para obtener reviews
    goToMovieDetails(movieId) {
      
      this.$router.go();
    },
    // Solicitud para obtener el money la pasta la guita la feria la lana
    formatCurrency(value) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(value);
    },
  },
  
};
</script>

<!-- <div class="movie-details" :style="backgroundImageStyle">
  <div v-if="movie" class="movie-poster">
    <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" :alt="movie.title" class="rounded-poster" />
  </div>
</style> -->