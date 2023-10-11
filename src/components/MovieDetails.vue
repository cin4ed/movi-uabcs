
<template>
    <div class="movie-details">
      <div v-if="movie" class="movie-poster">
        <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" :alt="movie.title" />
      </div>
      <div class="movie-info" v-if="movie">
        <h1>{{ movie.title }}</h1>
        <p>Puntuación: {{ movie.vote_average }}</p>
        <h3>Resumen:</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
    <h2 v-if="cast.length">Actores principales:</h2>
    <div class="actors-container" v-if="cast.length">
      <ul class="actor-list">
        <li v-for="actor in cast" :key="actor.id">
          <div class="actor">
            <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :alt="actor.name" />
            <p class="actor-name">{{ actor.name }}</p>
            <p class="character-name">{{ actor.character }}</p>
          </div>
        </li>
      </ul>
    </div>
 <!-- Reseñas -->
 <h2 v-if="reviews.length">Reseñas:</h2>
    <div class="review-container" v-if="reviews.length">
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
  <h2 >Trailer:</h2>
  <div class="video-container" v-if="trailerId">
    <iframe
      width="560"
      height="315"
      :src="embedUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
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
    };
  },
  computed: {
  embedUrl() {
    return `https://www.youtube.com/embed/${this.trailerId}`;
  },
},
  mounted() {
    const movieId = this.$route.params.id;
    

    this.getMovieDetails(movieId);
    this.getMovieReviews(movieId);
    this.getMovieTrailer(movieId);
  },
  methods: {
    async getMovieDetails(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`;

        const response = await axios.get(apiUrl);
        this.movie = response.data;

        // Solicitud para obtener actores
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
        const creditsResponse = await axios.get(creditsUrl);
        this.cast = creditsResponse.data.cast;
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    },
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
    async getMovieTrailer(movieId) {
      try {
        const apiKey = '6a71a113dddd8d476e8b8e07db83bb9d';
        const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=es-MX`;
      const response = await axios.get(videosUrl);

      const videos = response.data.results;
      const trailer = videos.find(
        (video) => video.type === 'Trailer' || video.type === 'Teaser'
      );

      if (trailer) {
        this.trailerId = trailer.key;
      }
    } catch (error) {
      console.error('Error al obtener el tráiler de la película:', error);
    }
},
  },
};
</script>


<style scoped>
.movie-details {
    background-color: rgb(36, 2, 124);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
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

.actor img {
  max-width: 100%;
  border: 2px solid #000;
  border-radius: 50%; /* imagen redonda */
  margin-bottom: 5px;
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
  max-width: 800px; /* ancho reseñas*/
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
  display: flex;
  justify-content: center; 
}
</style>
  