<script>
import 'swiper/css';
import 'swiper/css/navigation';
import Swiper from 'swiper';

export default {
    data() {
        return {
            swiper: null,
        }
    },
    props: {
        items: Object,
    },
    mounted() {
        this.swiper = new Swiper(".swiper-container", {
            slidesPerView: 2,
            spaceBetween: 12,
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 576px
                576: {
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                },
                // when window width is >= 768
                768: {
                    slidesPerView: 5,
                    slidesPerGroup: 4,
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                },
                // when window width is >= 1200px
                1200: {
                    slidesPerView: 8,
                    slidesPerGroup: 6,
                }
            }
        });
    },
    methods: {
        geturl(url) {
            return `http://image.tmdb.org/t/p/w500/${url}`;
        },
        slideNext() {
            this.swiper.slideNext();
        },
        slidePrev() {
            this.swiper.slidePrev();
        }
    }
}
</script>

<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="item in items" class="swiper-slide shadow-sm">
                <img :src="geturl(item.poster_path)" class="img-fluid img-undrag" alt="...">
            </div>
        </div>
        <div @click="slidePrev" class="fs-1 swiper-nav-btn prev-btn text-light"><i class="bi bi-arrow-left-short"></i></div>
        <div @click="slideNext" class="fs-1 swiper-nav-btn next-btn text-light"><i class="bi bi-arrow-right-short"></i></div>
    </div>
</template>

<style scoped>
    .swiper-container {
        position: relative;
    }

    .swiper-slide {
        border-radius: .5rem;
        overflow: hidden;
        height: auto;
        cursor: pointer;
    }

    .swiper-slide img {
        height: 100%;
        width: auto;
    }

    .swiper-slide:hover {
        transform: scale(1.05);
        transition: all 300ms ease-in-out;
    }

    .swiper-nav-btn {
        position: absolute;
        z-index: 1000;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        width: 5rem;
        cursor: pointer;
    }

    .prev-btn {
        background: linear-gradient(to left, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.7));
        padding-left: .4rem;
    }

    .next-btn {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.7));
        right: 0;
        padding-right: .4rem;
        justify-content: end;
    }
</style>