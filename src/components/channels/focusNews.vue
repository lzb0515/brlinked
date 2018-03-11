<template>
  <div class="focusNews" ref="wrapper">
    <div class="wrapper" v-show="rollImg.length">
      <div class="rollBox">
        <div class="refresh addData">{{pullDownText}}</div>
          <div class="swiper-container">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="img in rollImg">
              <img :src="img.img" width="100%" height="100%"/>
              <p class="info">{{img.info}}</p>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
        </div>
          <ul class="newsList"  v-show="news.length">
            <li class="newsItem" v-for="(item,index) in news">
              <div class="content">
                <div class="text">
                <h2 class="title">{{item.title}}</h2>
                <div class="notes">
                  <span class="ratings infoItem" v-show="item.rateCount">{{item.rateCount}}评</span>
                  <span class="time infoItem" v-show="item.time">{{item.time|time}}前</span>
                </div>
              </div>
              <div class="img">
                <img :src="item.image"/>
              </div>
              </div>
              <div class="border_1px" v-if="index!=(news.length-1)"></div>
            </li>
          </ul>
        <div class="load addData">{{pullUpText}}</div>
      </div>
    </div>
    <back-to-top v-show="backBtn" @click.native="back"></back-to-top>
  </div>
</template>

<script>
  import axios from "axios"
  import BScroll from "better-scroll"
  import Swiper from "swiper"
  import getTime from "../../common/js/getTime.js"
  import backToTop from "../base/backToTop"
  import {url} from "@/common/js/base"

  const ERR_OK = 0;
  export default {
    name:"focusNews",
    data(){
    	return {
    		news:[],
    		rollImg:[],
            pullUp:false,
            pullDown:false,
            pullDownText:"",
            pullUpText:"上拉加载更多...",
            upThreshold:-30,
            downThreshold:70,
            downStop:50,
            backBtn:false,
            backBtnThreshold:-1500
    	}
    },
    created(){
      this.getNews()
      this.swiper()
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
      initScroll(){
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          pullDownRefresh:{
            threshold:this.downThreshold,
            stop:this.getDownStop
          },
          pullUpLoad:{
            threshold:this.upThreshold
          }
        })
        this.scroll.on("pullingUp",() => {
          this.loadData();
          this.pullUp=true;
          this.scroll.refresh();
        })
        this.scroll.on("pullingDown",() => {
          this.pullDownText="刷新成功";
          this.loadData();
          this.pullDown=true;
        })
        this.scroll.on("scroll",(pos) => {
          if(this.pullDown) return;
          this.getRefreshText(pos);
        })
        this.scroll.on("scroll",(pos) => {
          if(pos.y>this.backBtnThreshold&&this.backBtn){
            this.backBtn=false;
          }
          if(pos.y<=this.backBtnThreshold&&!this.backBtn){
            this.backBtn=true;
          }
        })
      },
      loadData(){
        setTimeout(() => {
          axios.get(url.news + this.$route.params.id).then((res) => {
            var data=res.data.data.news;
            if(this.pullUp){
              this.news=this.news.concat(data.splice(0,3));
              this.pullUp=false;
              this.scroll.finishPullUp();
            } else if(this.pullDown){
              this.news.unshift(data[data.length-1]);
              this.pullDown=false;
              this.scroll.finishPullDown();
            } else{
              return
            }
            this.$nextTick(() => {
              this.scroll.refresh();
            })
          })
        },800)
      },
      getRefreshText(pos){
          if(pos.y<this.downThreshold){
            this.pullDownText="下拉刷新..."
          }
          else{
            this.pullDownText="释放刷新..."
          }
      },
      back(){
        this.scroll.scrollTo(0,0,1000);
      },
      getNews() {
          axios.get(url.news + this.$route.params.id).then((res)=>{
              if(res.data.errno == ERR_OK){
                  this.news=res.data.data.news;
                  this.rollImg=res.data.data.rollImg;
                  console.log(res.data)
                  console.log(this.rollImg)
                  this.$nextTick(() => {
                      this.swiper();
                      this.initScroll();
                  })
              }

          })
      }
    },
    filters:{
      time(value){
        return getTime(value);
      }
    },
    watch: {
        '$route': 'getNews', // 切换路由时
        //状态监视
        'refresh': 'getNews'
    },
    computed:{
      getDownStop(){
        const deviceWidth=document.documentElement.clientWidth;
        return this.downStop*deviceWidth/375;
      }
    },
    components:{
      backToTop
    }
  }
</script>

<style lang="scss">
  .focusNews{
    .wrapper{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .rollBox{
        position:relative;
        .addData{
          width: 100%;
          height:2rem;
          line-height: 2rem;
          text-align: center;
          font-size: 0.8rem;
          color:rgba(7,17,27,.5);
          font-weight: 700;
        }
        .refresh{
          position:absolute;
          left: 0;
          top: -2rem;
        }
        .load{
          
        }
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
        .newsList{
          padding: 0 0.5rem;
          .newsItem{
            width: 100%;
            height: 4.5rem;
            position:relative;
            .content{
              padding:0.5rem 0;
              width: 100%;
              height: 100%;
              box-sizing:border-box;
              display: flex;
              .text{
                flex:1;
                height: 100%;
                padding-right:0.3rem;
                .title{
                  font-size: 0.9rem;
                  line-height: 1.2rem;
                }
                .notes{
                  margin-top: 0.6rem;
                  font-size: 0.5rem;
                  color: rgba(7,17,27,.7);
                }
              }
              .img{
                flex:0 5.0rem;
                width: 5.0rem;
                height: 100%;
                overflow: hidden;
                img{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .border_1px{
              position:absolute;
              left: 0;
              bottom:0;
            }
          }
        }
      }
    }
  }
</style>