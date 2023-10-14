<!-- 
    #EL CSS SERÁ AGREGADO EN LA PARTE FINAL DEL CÓDIGO

    Este componente esta diseñado para cerar un carousel de manera más práctica y limpia en la plantilla donde requiera desplegarse.
    Para crear este elemento, necesitamos hacerle pasar 3 valores en el lugar dónde lo mandemos a llamar:
    
    -Title: Que será el titulo que tendra el Carousel
    -ID: Que era el identificar que utilizaremos para poder scrollear de manera horizontal con la rueda del raton
    -Request: Que sera el link de acceso de la API themoviedb de dónde nuestro Carousel sacara los resultados

    EJEMPLO:
    <CarouselObj title="arregloDeTitulos" carouselID="carousel-1" request="arregloDeURLS" :video="false"></CarouselObj>

    EJEMPLO PARA CREAR CARATULAS DE VIDEOS:
    <CarouselObj title="arregloDeTitulos" carouselID="carousel-1" request="arregloDeURLS" :video="true"></CarouselObj>
    z
    El arreglo que se utilice es seleccionado utilizando la variable index
 -->

<template>

    <div style="width: 70%;">
        <button v-if="!loading" v-for="(title, index) in this.title" :value="index" @click="changeIndex"> 
            {{ this.title[index] }}
        </button>
        <div v-if="!loading" class="carousel" style="background-color: yellow;">
            <br>
            <!-- Validamos si el resultado nos devolvio más de un resultado en las peliculas -->
            <!-- Revisamos el resultado de la peticion retorno alguna pelicula -->
            <ul v-if="!video && movieData.results.length > 0">
                <!-- v-for crea un objeto por cada objeto en el arreglo, dandonos la -->
                <!-- posibilidad de interactuar con el -->
                <li v-for="movie in movieData.results" :key="movie.id">
                    <router-link :to="'/movie/' + movie.id">
                        <img v-if="!video" :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path">
                    </router-link>
                </li>
            </ul>
            <div v-else>
                <!-- Container para tener todo en un sticky object -->
                <div v-if="mostrarvideo" style="position: fixed; top: 0px; left: 0px; width: 100%; 
                        height: 100%; z-index: 2; color: black;">
                    <!-- Div para dar el color transparente -->
                    <div style="width: 100%; height: 100%; background-color: black; opacity: 0.3; position: absolute;"></div>
                    <div style="position: absolute; background-color: black; padding: 10px; width: 70%;
                                display: flex; flex-direction: column; align-items: flex-end; top: 10%; left: 15%;
                                border-radius: 20px;">        
                        <p style="color: white; position: absolute; left: 20px; top: 0px;"> Aqui debe de ir un titulo </p>
                        <button style="all: unset; background-color: gray; padding: 5px 10px; 
                        border: 2px solid black; " @click="mostrarvideo=false">X</button>
                        <iframe
                            width="100%"
                            height="615"
                            :src=trailerurl
                            frameborder="0"
                            allowfullscreen
                            style="
                            border-radius: 10px"
                        ></iframe>
                    </div>
                </div>
                <!-- Mensaje al usuario donde no se pudieron encontrar las peliculas -->
                <ul v-if="video" style="gap: 40px;">
                    <!-- v-for crea un objeto por cada objeto en el arreglo, dandonos la -->
                    <!-- posibilidad de inuar con el -->
                    <li v-for="movie in movieData" :movieid="movie[1]">
                        <div id="carouselm-trailer-id" @click="console.log(movie[2]), mostrarvideo=true, trailerurl='https://www.youtube.com/embed/'+movie[2]" style="height: 100%; position: relative;">
                            <img id="carouselm-icon-id" src="../img/whiteplayicon.png" style="position: absolute; top:55px; left:120px;">
                            <img id="carouselm-image-id" style="border-radius: 10px;" width="310" :src="'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/' + movie[0]">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <p v-else>Cargando</p>
    </div>
        
</template>

<script>
    import { createApp } from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    
    const app = createApp();
    app.use(VueAxios, axios);

    export default{
        /* Declaramos props para poder pasarle a nuestro componente al momento de crearo */
        props: ['title','carouselID','request','video'],
        setup(props) {
            //debug de los valores recibidos del prop
            //console.log(props.title),
            //console.log(props.carouselID),
            //console.log(props.request)
        },
        data(){
            return{
                carouselHeader: 'Placeholder',  
                movieData: [],
                loading: true,
                index: 0,
                trailerKey: '',
                mostrarvideo: false,
                trailerurl: ''
            };
        },
        mounted(){
            this.rechargeCarousel();
        },
        methods:{
            getLink(resp, x, video){
                let addOn = (video == true ? 'videos?language=es-MX&' : 'images?');
                if(resp.data.results[x].media_type == 'movie' || this.index == 2){
                    return `https://api.themoviedb.org/3/movie/${resp.data.results[x].id}/`+ addOn +`api_key=6a71a113dddd8d476e8b8e07db83bb9d`;
                }else if(resp.data.results[x].media_type == 'tv' || this.index == 3){
                    return `https://api.themoviedb.org/3/tv/${resp.data.results[x].id}/`+ addOn +`api_key=6a71a113dddd8d476e8b8e07db83bb9d`;  
                }
            },
            rechargeCarousel(){
                this.movieData = [];
                if( !this.video ){
                    //Sacamos las imagenes de las peliculas.
                    //Las ponemos en un arreglo.
                    //Las mostramos en el carousel.
                    /* REQUEST PARA SACAR LAS IMAGENES DE LAS PELICULAS */
                    app.axios.get(this.request[this.index])
                    .then((resp)=>{
                        this.movieData = resp.data;
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.error = "Hubo un error al intentar cargar el catalogo de peliculas.";
                        console.error("Error 404.");
                        console.error(error);
                    })
                }else{
                    let link = ''; 

                    /* REQUEST PARA OBTENER LA INFORMACION DE LAS PELICULAS QUE ESTAN DENTRO DEL LINK QUE SON PASA AL INICIO */
                    app.axios.get(this.request[this.index])
                    .then((resp)=>{
                        let test = [];
                        for (let x in resp.data.results) {
                            link = this.getLink(resp, x, false);
                            /* REQUEST PARA SACAR EL LAS IMAGENES LARGAS QUE SON PARA EL TRAILER DE LA PELICULA */
                            app.axios.get(link)
                            .then((sresp)=>{
                                let encontrado = false;
                                let values = [];
                                /* console.log(sresp.data.backdrops); */
                                sresp.data.backdrops.forEach(backdrop => {
                                    if (!encontrado && backdrop.vote_average >= 1.5) {
                                        /* REQUEST PARA SACAR EL LINK DE YT */
                                        let videokey = '';
                                        app.axios.get(this.getLink(resp,x,true))
                                        .then((tresp)=>{
                                            console.log(tresp);
                                            videokey = tresp.data.results[0].key;
                                            values = [backdrop.file_path, resp.data.results[x].id, videokey];
                                            this.movieData.push(values);
                                            console.log(videokey);
                                        })
                                        .catch((error) => {
                                            this.error = "No se pudo encontrar un video para este id.";
                                            console.warn(this.error);
                                        })  
                                        /* values = [backdrop.file_path, resp.data.results[x].id, videokey]; */
                                        /* this.movieData.push(values); */
                                        encontrado = true;
                                    }
                                });
                            })
                            .catch((error) => {
                                this.error = "Error al obtener el poster de esta pelicula.";
                            })

                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        // Aqui va el codigo para manejar los errores
                        this.error = "Hubo un error al intentar cargar el catalogo de peliculas.";
                        console.error("Error 404.");
                        console.error(error);
                    })

                }
            },
            changeIndex(e){
                if(this.index == e.target._value)  
                    return;
                console.log("cambio");
                this.index = e.target._value;
                this.rechargeCarousel();
            },
        },
        computed: {
            embedUrl() {
                return ;
            },
        }
    }
</script>

<style>
    #carouselm-trailer-id{
        transition: 0.3s;
    }
    #carouselm-trailer-id:hover{
        transition: 0.3s;
        transform: scale(1.1);
    }
    .carousel{
        width: 80%;
        overflow-x: auto;
    }
    .carousel ul{
        display: flex;
        list-style: none;
        gap: 20px;
    }
</style>