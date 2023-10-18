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
        reviews: Object,
    },
    mounted() {
        this.swiper = new Swiper(".swiper-container-review", {
            slidesPerView: 1,
            spaceBetween: 12,
            modules: [ Navigation ],
            navigation: {
                nextEl: '.swiper-nav-btn-next-review',
                prevEl: '.swiper-nav-btn-prev-review',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                1200: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
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
    <div class="swiper-container swiper-container-review">
        <div class="swiper-wrapper swiper-wrapper-review">
            <div v-for="review in reviews" class="swiper-slide swiper-slide-review shadow-sm position-relative">
                <div class="card mt-3">
                    <div class="card-header">
                        <span class="card-title">{{ review.author }}</span>
                    </div>
                    <div class="card-body overflow-auto test">
                        <p class="card-text">{{ review.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div @click="slidePrev" class="swiper-nav-btn swiper-nav-btn-prev swiper-nav-btn-review swiper-nav-btn-prev-review fs-1">
            <i class="bi bi-arrow-left-short"></i>
        </div> -->
        <!-- <div @click="slideNext" class="swiper-nav-btn swiper-nav-btn-next swiper-nav-btn-review swiper-nav-btn-next-review fs-1 text-light">
            <i class="bi bi-arrow-right-short"></i>
        </div> -->
    </div>
</template>

<style scoped>
    .test {
        height: 15rem;
    }
    .swiper-container-review {
        position: relative;
    }

    .swiper-slide-review {
        border-radius: .5rem;
        overflow: hidden;
        height: auto;
        /* cursor: pointer; */
    }

    /* .swiper-slide-review:hover {
        transform: scale(1.05);
        transition: all 300ms ease-in-out;
    } */

    .swiper-nav-btn-review {
        position: absolute;
        z-index: 1000;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        width: 5rem;
        cursor: pointer;
    }

    .swiper-nav-btn-prev-review {
        padding-left: .4rem;
        border-radius: 5px 0 0 5px;
    }

    .swiper-nav-btn-next-review {
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