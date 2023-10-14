<template>

    <div>

        <h2>Actores populares</h2>

        <div class="actors_item">
            <ActorsItem :key="actor.id" v-for="actor in this.actors.results" :actor="actor"/> 
        </div>

    </div>

</template>
<script>
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

        const options = {
            method: 'GET',
            headers: {

                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcxYTExM2RkZGQ4ZDQ3NmU4YjhlMDdkYjgzYmI5ZCIsInN1YiI6IjY1MTlkOTY1MDcyMTY2MDEzOWM1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fvwRaFzNROAhNcfeY1qE_fR1eUi4rKTly4QCrm8u-C4',
                "content-type": "application/json"
            }
        };

        fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
        .then(response => response.json()) 
        .then(json => this.actors = json)
        .catch(err => console.error(err));

    },
    methods: {
    },

}
</script>
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
</style>