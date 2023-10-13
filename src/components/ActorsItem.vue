<template>
    
    <div>

        <div>
            <router-link class="link" :to="'/actor/${this.actor.id}'">
                <img :src="profileImage" alt="">
                <h3 class="name">{{actor.name}}</h3>
                <p>
                    {{ knownFor }}
                </p>
            </router-link>
        </div>

    </div>

</template>
<script>
export default{

    props:{

        actor: {

            required: true,

        }

    },
    computed:{

        profileImage(){

            return "https://www.themoviedb.org/t/p/w235_and_h235_face/"+ this.actor.profile_path

        },
        knownFor(){

            let knownStr = "";
            for(let i; i < this.actor.known_for.lenght - 1; i ++){

                knownStr += this.actor.known_for[i].title;

            }

            return knownStr;

        }

    }

}
</script>
<style >

.link{

    text-decoration: none;
    color:black

}
</style>
