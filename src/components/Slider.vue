<script>
import Swiper from 'swiper';
import 'swiper/css';

export default {
    props: {
        items: Object,
    },
    mounted() {
        const swiper = new Swiper(".swiper-container", {
            slidesPerView: 2,
            slidesPerGroup: 1,
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 600px
                600: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 5,
                    centeredSlides: true

                },
                // when window width is >= 900px
                900: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 5,
                    centeredSlides: false

                },
                // when window width is >= 1200px
                1200: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 5,
                    centeredSlides: false
                },

                // when window width is >= 1500px
                1500: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 5,
                    centeredSlides: false
                },

                // when window width is >= 1800px
                1800: {
                    slidesPerView: 8,
                    slidesPerGroup: 8,
                    spaceBetween: 12,
                    centeredSlides: true,
                    centeredSlidesBounds: true
                }
            }
        });
    },
    methods: {
        geturl(url) {
            return `http://image.tmdb.org/t/p/w500/${url}`;
        }
    }
}
</script>

<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="item in items" class="swiper-slide">
                <div class="">
                    <img :src="geturl(item.poster_path)" class="img-fluid img-undrag" alt="...">
                </div>
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<style scoped>
    .swiper-slide {
        border-radius: .5rem;
        overflow: hidden;
        transition: all 300ms ease-in-out;
    }

    .swiper-slide:hover {
        transform: scale(1.05);
        transition: all 300ms ease-in-out;
        /* transition-delay: 300ms; */
    }
</style>