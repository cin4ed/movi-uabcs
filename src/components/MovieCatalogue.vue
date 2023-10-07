<script>
    import { createApp } from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    
    const app = createApp();

    app.use(VueAxios, axios);

    export default{
        name:"MovieList",
        data(){
            return {
                movieData: null, // Se usa para almacenar la informacion del request realizado
                loading: true, // Se tiene por default en true para mostrar la carga de la solicitud
                error: null, //Dependiendo del resultado de la solicitud cambia su estado
                SessionKey: '',
            };
        },
        mounted(){
            console.log(localStorage.getItem('username'));
            if(localStorage.getItem('username') === null){
                console.log("wtf");
                this.$router.push('/login/');
            }
            app.axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=6a71a113dddd8d476e8b8e07db83bb9d')
            .then((resp)=>{
                console.warn(resp) //Mostramos lo que nos regresa el resp
                this.movieData = resp.data; //Almacenamos la informacion en una variable local
                console.log(this.movieData); // Confirmamos que hayamos guardado correctamente la informacion
                console.log(this.movieData.results);
                /* Se cambia el estado del Loading para que se muestren los resultados */
                this.loading = false;
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
    <div class="main-container">
        <div v-if="loading" class="loading-screen">Cargando...</div>
        <!-- Si se deja un v-else despues de un v-if funciona como else del if anterior -->
        <div v-else class="ul-container">
            <!-- Validamos si el resultado nos devolvio más de un resultado en las peliculas -->
            <ul v-if="movieData.results.length > 0">
                <!-- v-for crea un objeto por cada objeto en el arreglo, dandonos la -->
                <!-- posibilidad de interactuar con el -->
                <li v-for="movie in movieData.results" :key="movie.id" class="hover-movement">
                    <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" style="width: 80%; border-radius: 20px;">
                </li>
            </ul>
            <div v-else>
                <!-- Mensaje al usuario donde no se pudieron encontrar las peliculas -->
                <p>No se encontraron películas.</p>
            </div>
        </div>
        <div v-if="error" class="error-message"><h1>{{ error }}</h1></div>
    </div>
</template>

<style scoped>
    .main-container{
        /* Color del fondo del contenedor principal */
        background-color: rgb(36, 2, 124);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    ul, li{
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    ul > li{   
        color: white;
        width: 100%;
        height: 300px;
    }
    ul{
        /* Color del fondo del contenedor de elementos */
        background-color: rgb(36, 2, 124);
        padding: 20px;
        display: grid;
        column-gap: 20px;
        row-gap: 80px;
        /* gap: 10px 20px; puede ser utilizado cómo shorthand de column/row */
        
        /* Se refiere a la anchura de cada columna */
        /* Puse este tipo de medidas para hacer que se acomodaran de manera uniforme*/
        grid-template-columns: 240px 240px 240px 240px 240px;
        grid-template-rows: 240px 240px 240px 240px 0px;
    }
    .ul-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .hover-movement:hover{
        transition: transform 0.5s;
        transform: scale(1.15);
        /* Cambio del icono del mouse */
        cursor: pointer;
    }

</style>