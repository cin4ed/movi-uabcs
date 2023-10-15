<template>
  <div v-if="!loading">
    <h1>{{ seriesData.name }}</h1>
    <img :src="'https://www.themoviedb.org/t/p/w130_and_h195_bestv2/' + seriesData.poster_path">
    <p>{{ seriesData.first_air_date }}</p>
    <h3>☆{{ seriesData.vote_average }}</h3>
    <h3>{{ seriesData.number_of_seasons }} Temporadas</h3>
    <h2>{{ seriesData.overview }}</h2>
    <!-- Ahora puedes iterar sobre las temporadas -->
    <div v-for="season in seasonsData" :key="season.id">
      <h3>Temporada {{ season.season_number }}</h3>
      <p>{{ season.air_date }}</p>
      <p>{{ season.episode_count }} Episodios</p>
      <p>{{ season.overview }}</p>
    </div>
  </div>
  <p v-else>Cargando...</p>
</template>

<script>
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp();

app.use(VueAxios, axios);

export default {
  props: {
    serieId: {
      type: Number,
      default: 37680 // Establecer serieId en 37680 como valor predeterminado
    },
  },
  data() {
    return {
      seriesData: [],
      seasonsData: [],
      loading: true,
    };
  },
  mounted() {
    // Realiza una solicitud para obtener la información de la serie
    app.axios.get('https://api.themoviedb.org/3/tv/' + this.serieId + '?api_key=6a71a113dddd8d476e8b8e07db83bb9d&language=es-MX')
      .then((resp) => {
        this.seriesData = resp.data;
        this.loading = false;
        
        // Ahora, para cada temporada, realiza una solicitud para obtener detalles
        this.fetchSeasonDetails(this.serieId, this.seriesData.number_of_seasons);
      })
      .catch((error) => {
        this.error = "Hubo un error al intentar cargar la información de la serie.";
        console.error("Error 404.");
        console.error(error);
      });
  },
  methods: {
    fetchSeasonDetails(serieId, numberOfSeasons) {
      for (let seasonNumber = 1; seasonNumber <= numberOfSeasons; seasonNumber++) {
        app.axios.get(`https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=6a71a113dddd8d476e8b8e07db83bb9d&language=es-MX`)
          .then((resp) => {
            this.seasonsData.push(resp.data);
          })
          .catch((error) => {
            console.error("Error 404.");
            console.error(error);
          });
      }
    }
  }
};
</script>
