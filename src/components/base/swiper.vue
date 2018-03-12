<template>
    <div class="swipers">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="img in rollImg">
                    <img :src="img.img" width="100%" height="100%"/>
                    <p class="info">{{img.info}}</p>
                </li>
            </ul>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    const ERR_OK = 0
    import Swiper from "swiper"
    import {url} from "@/common/js/base"
    export default {
        name: "swipers",
        data() {
            return {
                rollImg:[]
            }
        },
        created(){
            this.getNew()
        },
        methods:{
            swiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    speed: 2000,
                    loop: true,
                    observer:true,
                    observeParents:true,
                    autoplayDisableOnInteraction : false,
                    autoplay:1500
                })
            },
            getNew() {
                this.$http.get(url.news + "rollImg").then((res)=>{
                    if(res.data.errno == ERR_OK){
                        console.log(res.data)
                        this.rollImg = res.data.data;
                        this.$nextTick(() => {
                            this.swiper();
                        })
                    }

                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .swiper-container{
        width: 100%;
        height: 9.0rem;
        .swiper-slide{
            position: relative;
            .info{
                position:absolute;
                left:0.5rem;
                bottom:1.0rem;
                color: #fff;
                font-size: 0.8rem;
            }
        }
        .swiper-pagination{
            text-align: right;
            padding-right: 0.5rem;
            box-sizing:border-box;
            .swiper-pagination-bullet-active{
                background-color:#fff;
            }
        }
    }
</style>