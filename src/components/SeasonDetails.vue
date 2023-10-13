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
        overview :'chimba'

      };

    },
    mounted(){
      app.axios.get('https://api.themoviedb.org/3/tv/91363?api_key=6a71a113dddd8d476e8b8e07db83bb9d')
                .then((resp)=>{
                    //en caso de exito 
                    console.log(resp.data.name)
                    this.title=resp.data.name
                    this.loading=false
                    this.overview=resp.data.overview

                })
                .catch((error) => {
                    // Aqui va el codigo para manejar los errores
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
    <h2>{{ overview }}</h2>
  </div>
  <p v-else>Cargando...</p>
</template>
