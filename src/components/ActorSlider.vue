<script>
import 'swiper/css';
import 'swiper/css/navigation';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default {
    data() {
        return {
            swiper: null,
        }
    },
    props: {
        actors: Object,
    },
    mounted() {
        this.swiper = new Swiper(".swiper-container-actor", {
            slidesPerView: 2,
            spaceBetween: 12,
            modules: [ Navigation ],
            navigation: {
                nextEl: '.swiper-nav-btn-next-actor',
                prevEl: '.swiper-nav-btn-prev-actor',
            },
            breakpoints: {
                576: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                992: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                },
                1200: {
                    slidesPerView: 7,
                    slidesPerGroup: 7,
                }
            }
        });
    },
    methods: {
        geturl(url) {
            return `http://image.tmdb.org/t/p/w500/${url}`;
        },
    }
}
</script>

<template>
    <div class="swiper-container swiper-container-actor">
        <div class="swiper-wrapper">
            <div v-for="actor in actors" class="swiper-slide swiper-slide-actor shadow-sm position-relative test">
                <router-link :to="`/actor/${actor.id}`">
                    <div>
                        <img v-if="actor.profile_path" :src="geturl(actor.profile_path)" class="img-fluid img-undrag" alt="...">
                    </div>
                    <div class="swiper-slide-dim-bg"></div>
                    <div class="actor-info position-absolute bottom-0 d-flex flex-column py-2 px-2">
                        <span class="text-light fw-bold">{{ actor.name }}</span>
                        <span class="text-light fw-light">{{ actor.character }}</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div @click="slidePrev" class="swiper-nav-btn swiper-nav-btn-prev swiper-nav-btn-actor swiper-nav-btn-prev-actor fs-1 text-light">
            <i class="bi bi-arrow-left-short"></i>
        </div>
        <div @click="slideNext" class="swiper-nav-btn swiper-nav-btn-next swiper-nav-btn-actor swiper-nav-btn-next-actor fs-1 text-light">
            <i class="bi bi-arrow-right-short"></i>
        </div>
    </div>
</template>

<style scoped>
    .test {
        background-image: url(/src/assets/person-gray.svg);
        background-repeat: no-repeat;
        background-position: center;
    }
    .swiper-container-actor {
        position: relative;
    }

    .swiper-slide-actor {
        border-radius: .5rem;
        overflow: hidden;
        height: auto;
        cursor: pointer;
    }

    .swiper-slide-actor img {
        height: 100%;
        width: auto;
    }

    .swiper-slide-actor:hover {
        transform: scale(1.05);
        transition: all 300ms ease-in-out;
    }

    .swiper-nav-btn-actor {
        position: absolute;
        z-index: 1000;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        width: 5rem;
        cursor: pointer;
    }

    .swiper-nav-btn-prev-actor {
        padding-left: .4rem;
        border-radius: 5px 0 0 5px;
    }

    .swiper-nav-btn-next-actor {
        right: 0;
        padding-right: .4rem;
        justify-content: end;
        border-radius: 0 5px 5px 0;
    }

    .swiper-slide-dim-bg {
        background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.4));
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
    }
</style>