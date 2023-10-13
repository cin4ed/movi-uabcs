<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        movie: null,
      };
    },
    mounted() {
      const movie_id = this.$route.params.id;
      axios.get(`https://api.themoviedb.org/3/tv/${movie_id}?language=en-US&api_key=${this.API_KEY}`)
        .then(res => this.movie = res.data)
        .catch(err => console.error('error: ' + err));
    }
  }
</script>

<template>
  <template v-if="movie">
    {{ movie.name }}
  </template>
</template>

