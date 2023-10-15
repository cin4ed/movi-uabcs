<template>
    <div class="global-container">
        <p class="page-title" v-if="dataLoaded"> {{ pageName }}</p>    
        <div class="login-container" v-if="Login">
            <form @submit.prevent="iniciarSesion">
                <input type="text" v-model="username" placeholder="Usuario">
                <input type="password" v-model="password" placeholder="Contraseña">
                <button type="submit"> Entrar </button>
            </form>
        </div>
        <div class="menu-options" v-else>
            <button @click="showLoginForm(true)">Login</button>
            <button @click="destroySession">Destroy Session Debug</button>
        </div>
    </div>
</template>

<script>
    import { createApp } from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';

    const app = createApp();

    app.use(VueAxios, axios);

    export default{
        data(){
            return {
                movieData: null, // Se usa para almacenar la informacion del request realizado
                loading: true, // Se tiene por default en true para mostrar la carga de la solicitud
                error: null, //Dependiendo del resultado de la solicitud cambia su estado
                username: '',
                password: '',
                requestoken: null,
                Login: false,
                SessionKey: '',
                SessionID: '',
                AppTitle: '',
                constants: {},
                dataLoaded: false,
                /* Esta va para el kenneth */
            };
        },
        created(){
                // Cargar el archivo JSON usando fetch o axios
                fetch('../../public/pageInformation.json')
                .then(response => response.json())
                .then(data => {
                    this.constants = data; // Asignar los datos del JSON al objeto "constants"
                    console.log(this.constants);
                    this.dataLoaded = true;
                    
                    document.documentElement.style.setProperty('--c1', this.constants.colors[0].c1);
                    document.documentElement.style.setProperty('--c2', this.constants.colors[0].c2);
                    document.documentElement.style.setProperty('--c3', this.constants.colors[0].c3);
                    document.documentElement.style.setProperty('--c4', this.constants.colors[0].c4);
                    document.documentElement.style.setProperty('--c5', this.constants.colors[0].c5);
                })
                .catch(error => console.error('Error al cargar el JSON', error));
        },  
        mounted(){
                /* Importacion de colores del json */
                console.log("username:"+localStorage.getItem('username'));
                /* Se manda la peticion para un requestToken con los datos del header cargados en una variable */
                app.axios.get('https://api.themoviedb.org/3/authentication/token/new',this.$APIHeaders)
                .then((resp)=>{
                    //Almacenamos nuestro request token generado para logear al usuario a futuro.
                    this.requestoken = resp.data.request_token;
                    /* Se cambia el estado del Loading para que se muestren los resultados */
                    this.loading = false;
                })
                .catch((error) => {
                    // Aqui va el codigo para manejar los errores
                    this.error = "Hubo un error al intentar crear un request token.";
                })
        },
        methods: {
            iniciarSesion(){
                app.axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login',{
                'username': this.username,
                'password': this.password,
                'request_token': this.requestoken
                }, this.$APIHeaders)
                .then((resp)=>{
                    this.movieData = resp.data; //Almacenamos la informacion en una variable local
                    // Se cambia el estado del Loading para que se muestren los resultados 
                    this.loading = false;

                        app.axios.post('https://api.themoviedb.org/3/authentication/session/new', {
                            'request_token': this.requestoken
                        }, this.$APIHeaders)
                        .then((resp) => {
                            
                            this.SessionKey = resp.data;
                            console.log(this.SessionKey.session_id);
                            console.log(resp)
                            localStorage.setItem('username', this.username);
                            localStorage.setItem('sessionKey', this.SessionKey.session_id);

                            app.axios.get(`https://api.themoviedb.org/3/account?api_key=6a71a113dddd8d476e8b8e07db83bb9d&session_id=${this.SessionKey.session_id}`,this.$APIHeaders)
                            .then((resp) => {
                                localStorage.setItem('sessionID', resp.data.id);
                                console.log(localStorage.getItem('sessionID'));
                                this.$router.push('/index/');
                            })
                            .catch((error) => {
                                console.error('Error al verificar la sesión:', error);
                            });
                        })
                        .catch((error) => {
                            console.error('Error al verificar la sesión:', error);
                        });
                })
                .catch((error) => {
                    // Aqui va el codigo para manejar los errores
                    this.error = "Hubo un error al intentar iniciar sesion.";
                }) 
            },
            showLoginForm(flag){
                this.Login = flag;
            },
            destroySession(){
                    localStorage.removeItem('username');
            }
        },
        computed:{
            pageName(){
                return this.constants.headers[0].pageName;
            }
        }
        
    }
</script>

<style scoped>
    .login-container, .menu-options{
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-width: 450px;

        background-color: var(--c3);
        border-radius: 15px;
        box-shadow: 0px 0px 10px lightgray;
    }
    .login-container{
        min-height: 25%;
        color: black;
        padding: 0px 30px;
    }
    .login-container form{
        gap: 10px;
    }
    .login-container form input{
        all: unset;

        background-color: white;
        border: 1px solid black;
        padding: 5px;
        height: 30px;
        font-size: 20px;
        border-radius: 10px;
    }
    .login-container button{
        all: unset;

        text-align: center;
        background-color: white;
        color: white;
        padding: 5px;
        border-radius: 5px;
        height: 30px;
        font-size: 25px;
        font-weight: bold;
        background-color: #25c13c;
        font-family: 'Luminari', sans-serif;

    }
    .menu-options{
        gap: 20px;
        padding: 30px;
    }
    .menu-options button{
        all: unset;

        background-color: white;
        text-align: center;

        min-width: 100px;
        padding: 4px 30px;
        border-radius: 5px;
        font-size: 25px;
        font-weight: bold;

    }
    .page-title{
        all: unset;
        margin: 20px 0px;
        font-size: 100px;
        font-weight: bold;
        color: white;
        text-shadow: 3px 3px 7px black;
        font-family: 'Luminari', sans-serif;
    }

    .login-container form{
        display: flex;
        flex-direction: column;
    }
    .global-container{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--c2);
        height: 100vh;
        flex-direction: column;
    }
</style>