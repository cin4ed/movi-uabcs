<template>
    <!-- <div class="global-container">
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
    </div> -->
    <div class="container">
        <div class="row">
            <form class="col-10 col-sm-7 col-md-5 mx-auto gap-2" @submit.prevent="iniciarSesion">
                <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="username">
                    <label for="floatingInput">Nombre de Usuario</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <!-- <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                    </label>
                </div> -->
                <button class="btn btn-primary w-100 py-2" type="submit">Entrar</button>
                <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            </form>
        </div>
    </div>
</template>

<script>
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp();

app.use(VueAxios, axios);

export default {
    data() {
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
    created() {
        // Cargar el archivo JSON usando fetch o axios
        fetch('../../public/pageInformation.json')
            .then(response => response.json())
            .then(data => {
                this.constants = data; // Asignar los datos del JSON al objeto "constants"
                console.log(this.constants);
                this.dataLoaded = true;
            })
            .catch(error => console.error('Error al cargar el JSON', error));
    },
    mounted() {
        /* Importacion de colores del json */
        console.log("username:" + localStorage.getItem('username'));
        /* Se manda la peticion para un requestToken con los datos del header cargados en una variable */
        app.axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=6a71a113dddd8d476e8b8e07db83bb9d')
            .then((resp) => {
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
        iniciarSesion() {
            app.axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=6a71a113dddd8d476e8b8e07db83bb9d', {
                'username': this.username,
                'password': this.password,
                'request_token': this.requestoken
            })
                .then((resp) => {
                    this.movieData = resp.data; //Almacenamos la informacion en una variable local
                    // Se cambia el estado del Loading para que se muestren los resultados 
                    this.loading = false;

                    app.axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key=6a71a113dddd8d476e8b8e07db83bb9d', {
                        'request_token': this.requestoken
                    })
                        .then((resp) => {

                            this.SessionKey = resp.data;
                            console.log(this.SessionKey.session_id);
                            console.log(resp)
                            localStorage.setItem('username', this.username);
                            localStorage.setItem('sessionKey', this.SessionKey.session_id);

                            app.axios.get(`https://api.themoviedb.org/3/account?api_key=6a71a113dddd8d476e8b8e07db83bb9d&session_id=${this.SessionKey.session_id}`)
                                .then((resp) => {
                                    localStorage.setItem('sessionID', resp.data.id);
                                    console.log(localStorage.getItem('sessionID'));
                                    this.$router.push('/');
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
        showLoginForm(flag) {
            this.Login = flag;
        },
        destroySession() {
            localStorage.removeItem('username');
        }
    },
    computed: {
        pageName() {
            return this.constants.headers[0].pageName;
        }
    }

}
</script>

<style scoped>
</style>