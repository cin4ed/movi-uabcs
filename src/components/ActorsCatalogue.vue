<template>
    <div id='app'>


        <div class="hero is-white is-gradient is-bold">

            <div class="hero-body">

                <h1 class="title">

                    <span class="has-text-success">Actores</span>
                    <span class="subtitle">Nombres</span>


                </h1>
                <button class="button is-success is-rounded" v-on:click="fetch">Consultar Actores</button>


            </div>

        </div>

        <h1 class="title">Lista de actores</h1>


        <div v-for="character of characters" v-bind:key="character.id">

           <p>{{ character.name}}</p>

        </div>
    </div>
</template>
<script>

    import { createApp } from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    const app = createApp()

    app.use(VueAxios, axios)
    export default{

        name:"Actor List",
        data: function (){

            return {

                characters: []

            }

        },
        methods:{

            fetch(){

                let result= axios.get("https://api.themoviedb.org/3/person/popular?api_key=6a71a113dddd8d476e8b8e07db83bb9d").then((res) => {

                    this.characters=res.data.results
                    console.log(this.characters)

                })
                .catch((err) =>{

                    console.log(err)

                })

                console.log("Hola mundo")

            }

        }
    }


</script>
