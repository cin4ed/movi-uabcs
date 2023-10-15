<template>

    <div>

        <h2>Actores populares</h2>

        <div class="actors_item">
            <ActorsItem :key="actor.id" v-for="actor in this.actors.results" :actor="actor"/> 
        </div>

        <!-- Se crearon los "botones" de previous y next para cambiar de página de actores -->
        <div class="more_actors">

            <a href="" v-on:click.prevent="previous"> Previous </a>
            <a href="" v-on:click.prevent="next"> Next </a>

        </div>

    </div>

</template>
<script>
// Cree una variable para poder cambiar de página de actores
let currentPage=1;
import ActorsItem from "../components/ActorsItem.vue"
import ActorsDetails from "../components/ActorsDetails.vue"
export default{

    data: function(){

        return {

            actors:[]

        }

    },
    components: {

        ActorsItem,

    },
    mounted(){
        this.fetchActors(currentPage);
    },
    methods: {

        // La petición la hice un método para poder cambiar de página
        fetchActors(page){
            const options = {
                method: 'GET',
                headers: {

                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcxYTExM2RkZGQ4ZDQ3NmU4YjhlMDdkYjgzYmI5ZCIsInN1YiI6IjY1MTlkOTY1MDcyMTY2MDEzOWM1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fvwRaFzNROAhNcfeY1qE_fR1eUi4rKTly4QCrm8u-C4',
                    "content-type": "application/json"
                }
            };
            
            // Aqui en vez de pasarle el número de pagina, le pasamos nuestra variable directamente
            fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page='+currentPage, options)
            .then(response => response.json()) 
            .then(json => this.actors = json)
            .catch(err => console.error(err));
        },
        next(){

            currentPage+=1;
            this.fetchActors(currentPage);
        },
        previous(){

            // Para verificar que la página no llegue a un numero negativo, se hace la validación
            if(currentPage==1){

                alert("Estás en la primera página!")

            }else{
                
                currentPage-=1;
                this.fetchActors(currentPage);

            }

        }
    },

}
</script>
    <style scoped>
    .actors_item{

        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        gap: 20px;
        flex-wrap: wrap;

    } 
    a{

        text-decoration: none;
        color: black;
        align-items: center;

    }
</style>