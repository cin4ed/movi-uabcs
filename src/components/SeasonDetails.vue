<script>
    import { createApp } from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    
    const app = createApp();

    app.use(VueAxios, axios);
  export default{
    props: ['serieId'],
    data(){
      return{
        title:'blabla',
        loading:true,
        overviewer :'chimba',
        numSeason:'',
        numCap:'',
        airDate:'',
        serieUrl:[],

      };

    },
    mounted(){
      
      app.axios.get('https://api.themoviedb.org/3/tv/91363?api_key=6a71a113dddd8d476e8b8e07db83bb9d')
      .then((resp)=>{
          //en caso de exito 
          console.log(resp)
          this.title=resp.data.name
          this.loading=false
          this.overviewer=resp.data.overview
          this.numSeason=resp.data.number_of_seasons
          this.airDate=resp.data.first_air_date
          this.numCap=resp.data.number_of_episodes

      })
      .catch((error) => {
          // Aqui va el codigo para manejar los errores
          this.error = "Hubo un error al intentar cargar el catalogo de peliculas.";
          console.error("Error 404.");
          console.error(error);
      })
      app.axios.get('https://api.themoviedb.org/3/tv/91363/season/1/images?api_key=6a71a113dddd8d476e8b8e07db83bb9d')
      .then((resp)=>{
          this.serieUrl = resp.data.posters[0].file_path;
          this.loading = false;
          console.log(resp.data.posters[0].file_path)
      })
      .catch((error) => {
          this.error = "Hubo un error al intentar cargar el catalogo de peliculas.";
          console.error("Error 404.");
          console.error(error);
      })
    }

  }
</script>

<template>
  <div v-if="!loading">
    Seasons
    <h1>{{ title }}</h1>
    <img :src="'https://www.themoviedb.org/t/p/w130_and_h195_bestv2/'+serieUrl">
    <p>{{ airDate }}</p>
    <h3>Temporada•{{ numSeason }}  {{ numCap }}•Episodios</h3>
    <h2>{{ overviewer }}</h2>
    
    
  </div>
  <p v-else>Cargando...</p>
</template>
