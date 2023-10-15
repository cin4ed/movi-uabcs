
<template>
    <div class="movie-details" :style="backgroundImageStyle">
      <div v-if="movie" class="movie-poster">
        <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" :alt="movie.title" class="rounded-poster" />
      </div>
      <div class="movie-info" v-if="movie">
        <h1>{{ movie.title }}</h1>
        <p>Puntuación: {{ movie.vote_average }}</p>
        <h3>Duración:</h3>
      <p>{{ movie.runtime }} minutos</p>
        <h3>Resumen:</h3>
        <p>{{ movie.overview }}</p>
        <h3>Fecha de Lanzamiento:</h3>
      <p>{{ movie.release_date }}</p>
      <h3>Géneros:</h3>
      <ul class="genres">
        <li v-for="genre in (movie.genres ? movie.genres : [])" :key="genre.id">
          {{ genre.name }}
        </li>
      </ul>
      <!-- favorito -->
      <div class="movie-favorite">
      <button @click="toggleFavorite">
        {{ isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito' }}
      </button>
    </div>
    <!-- calificar -->
    <div>
    <label for="rating">Seleccione calificación:</label>
    <select id="rating" v-model="userRating">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button @click="calificarPelicula">Calificar</button>
  </div>
    <div v-if="mostrarCalificaciones">
    <div class="user-ratings">
    <p>Calificación seleccionada por el usuario: {{ userRating || 'No seleccionada' }}</p>
    </div>
    </div>
    </div>
  </div>
    <!-- información adicional -->
    <div class="additional-info">
      <div class="general-info">
      <h3>Estado de la película:</h3>
      <p>{{ movie ? movie.status : 'Cargando...' }}</p>
      <h3>Idioma original:</h3>
      <p>{{ movie ? movie.original_language : 'Cargando...' }}</p>
      <h3>Presupuesto:</h3>
      <p>{{ movie ? formatCurrency(movie.budget) : 'Cargando...' }}</p>
      <h3>Ingresos:</h3>
      <p>{{ movie ? formatCurrency(movie.revenue) : 'Cargando...' }}</p>
    </div>
    <div>
      <!-- palabras clave -->
      <h3 v-if="movie && movie.keywords && movie.keywords.length">Palabras clave:</h3>
      <ul class="keywords" v-if="movie && movie.keywords && movie.keywords.length > 0">
        <li v-for="keyword in (movie ? movie.keywords : [])">
          <span class="keyword-button">{{ keyword ? keyword.name : 'Cargando...' }}</span>
        </li>
      </ul>
    </div>
    </div>
    <!-- Actores -->
    <h2 v-if="cast.length">Actores principales:</h2>
    <div class="actors-container" v-if="cast.length">
      <ul class="actor-list">
        <li v-for="actor in cast" :key="actor.id">
          <div v-if="actor.profile_path" class="actor">
            <a :href="'/actor/'+actor.id">
            <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :alt="actor.name" />
          </a>
            <p class="actor-name">{{ actor.name }}</p>
            <p class="character-name">{{ actor.character }}</p>
          </div>
        </li>
      </ul>
    </div>
 <!-- Reseñas -->
    <div class="review-container" v-if="reviews.length">
      <h2 v-if="reviews.length">Reseñas:</h2>
      <ul>
        <li v-for="(review, index) in reviews" :key="review.id">
          <div class="review" v-if="showAllReviews || index === 0">
            <p class="review-author">{{ review.author }}</p>
            <p class="review-content">{{ review.content }}</p>
          </div>
        </li>
      </ul>
      <button @click="toggleReviewsVisibility" class="show-more-button">
        {{ showAllReviews ? 'Ocultar reseñas' : 'Ver el resto de reseñas' }}
      </button>
    </div>
  <!-- Trailer -->
  <div class="video-container" v-if="trailerId || posterImage">
  <h2 class="video-title">{{ trailerId ? 'Tráiler:' : 'Información:' }}</h2>
  <div v-if="trailerId">
    <iframe
      width="560"
      height="315"
      :src="embedUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
  <div v-else>
    <img :src="posterImage" alt="Póster de la película" />
    <p>{{ trailerUnavailableMessage }}</p>
  </div>
</div>
  <!-- Recomendaciones -->
  <h2>Recomendaciones:</h2>
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
</div>
</template>
  
  <script>
import axios from 'axios';

export default {
  name: 'MovieDetails',
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


<style scoped>

.rounded-poster {
  max-width: 100%;
  border-radius: 15px; 
  box-shadow: 0 10px 10px rgba(255, 255, 255, 0.1); 
}
.movie-details {
    background-color: rgb(36, 2, 124);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

.movie-poster img {
  max-width: 100%;
}

.movie-info {
  margin-left: 20px;
  color: white;
}

.movie-info h1, .movie-info p, .movie-info ul {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

.genres {
  list-style: none;
  padding: 0;
}

.genres li { 
  display: inline-block; 
  margin-right: 10px;
  font-size: 1.1em;
}

.keywords {
  list-style: none;
  padding: 0;
}

.keywords li {
  display: inline-block; 
  margin-right: 10px;
  margin-top: 15px;
  font-size: 1.1em;
  
}

.keyword-button {
  background-color: #007BFF; 
  color: white;
  padding: 5px 10px;
  border: 1px solid #000000;
  border-radius: 5px; 
  cursor: default;
  font-size: 1.1em;
}

.keyword-button:hover {
    background-color: #0056b3; 
  }

.general-info {
  display: flex;
  justify-content: space-evenly; 
  background-color: #336eac; 
  color: white;
  border: 1px solid #000000;
  border-radius: 5px; 
  cursor: default;
  font-size: 1.1em;
}

ul {
  list-style: none;
  padding: 0;
}



.actor-list {
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 10px;
}

.actor-list ul {
  display: flex;
  list-style: none;
  padding: 0;
}

.actors-container {
  overflow-x: auto; 
  white-space: nowrap; 
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

.actor-list {
  display: flex;
  padding: 0;
}

.actor {
  text-align: center;
  margin: 10px;
  
}

.actor-image {
  width: 100px; 
  height: 100px; 
  object-fit: cover; 
}


.review-list {
  margin-top: 10px;
}

.review-list ul {
  list-style: none;
  padding: 0;
}

.review {
 
  padding: 10px;
  margin: 10px 0;
}

.review-author {
  font-weight: bold;
  
}


.review-container {
  margin: 0 auto;
  text-align: left;
  background-color: rgba(184, 184, 184, 0.6); 
  border-radius: 10px; 
  max-width: 800px; 
  padding: 20px;
}



.show-more-button {
  background-color: black;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.show-more-button:hover {
  background-color: white;
  color: black;
}
.video-container {
  margin-top: 30px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.video-title {
  margin-bottom: 30px; 
  font-size: 1.5em;
  color: rgb(0, 0, 0); 
}

.recommendations-container {
  display: flex;
  gap: 20px;
}

.recommendation-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  gap: 20px;
}

.recommendation {
  cursor: pointer;
  text-align: center;
  width: 150px; 
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

.recommendation img {
  max-width: 100%;
  border: 2px solid #000;
  border-radius: 5px;
  margin-bottom: 5px;
}

.recommendation-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}

</style>
  