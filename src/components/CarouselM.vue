<!-- 
    #EL CSS SERÁ AGREGADO EN LA PARTE FINAL DEL CÓDIGO

    Este componente esta diseñado para cerar un carousel de manera más práctica y limpia en la plantilla donde requiera desplegarse.
    Para crear este elemento, necesitamos hacerle pasar 3 valores en el lugar dónde lo mandemos a llamar:
    
    -Title: Que será el titulo que tendra el Carousel
    -ID: Que era el identificar que utilizaremos para poder scrollear de manera horizontal con la rueda del raton
    -Request: Que sera el link de acceso de la API themoviedb de dónde nuestro Carousel sacara los resultados

    EJEMPLO:
    <CarouselObj title="arregloDeTitulos" carouselID="carousel-1" request="arregloDeURLS"></CarouselObj>

    El arreglo que se utilice es seleccionado utilizando la variable index

    Para quitar la funcion de que cuando el mouse este encima del carousel, el evento sea detectado para que se desplace,
    simplemente hay que eliminar el evento.
    Si se piensa hacer de manera permanente, no olvidar eliminar todas las dependencias que esta funcionalidad utiliza
 -->

<template>
    <div v-if="!loading" class="carousel" :ref="carouselID" @mousewheel="scrollX">
        <!-- Validamos si el resultado nos devolvio más de un resultado en las peliculas -->
        <button v-for="(title, index) in this.title" :value="index" @click="changeIndex"> 
            {{ this.title[index] }}
        </button>
        <!-- Revisamos el resultado de la peticion retorno alguna pelicula -->
        <ul v-if="movieData.results.length > 0">
            <!-- v-for crea un objeto por cada objeto en el arreglo, dandonos la -->
            <!-- posibilidad de interactuar con el -->
            <li v-for="movie in movieData.results" :key="movie.id">
                <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path">
            </li>
        </ul>
        <div v-else>
            <!-- Mensaje al usuario donde no se pudieron encontrar las peliculas -->
            <p>No se encontraron películas.</p>
        </div>
    </div>
</template>

<script>
    /**/
    import { createApp } from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    
    const app = createApp();

    app.use(VueAxios, axios);


    export default{
        /* Declaramos props para poder pasarle a nuestro componente al momento de crearo */
        props: ['title','carouselID','request'],
        setup(props) {
            //debug de los valores recibidos del prop
            //console.log(props.title),
            //console.log(props.carouselID),
            //console.log(props.request)
        },
        data(){
            return{
                carouselHeader: 'Placeholder',  
                movieData: null,
                loading: true,
                index: 0
            };
        },
        mounted(){
            this.rechargeCarousel();
        },
        methods:{
            scrollX(e){
                this.$refs[this.carouselID].scrollLeft += e.deltaY;
            },rechargeCarousel(){
                console.log("recargando");
                app.axios.get(this.request[this.index])
                .then((resp)=>{
                    //console.log(resp);
                    //console.warn(resp) //Mostramos lo que nos regresa el resp
                    this.movieData = resp.data; //Almacenamos la informacion en una variable local
                    // Se cambia el estado del Loading para que se muestren los resultados 
                    this.loading = false;
                })
                .catch((error) => {
                    // Aqui va el codigo para manejar los errores
                    this.error = "Hubo un error al intentar cargar el catalogo de peliculas.";
                    console.error("Error 404.");
                    console.error(error);
                })
            },
            changeIndex(e){
                if(this.index == e.target._value)  
                    return;
                console.log("cambio");
                this.index = e.target._value;
                this.rechargeCarousel();
            }
            
        }
    }
    
</script>

<style>

</style>