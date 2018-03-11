<template>
	<div class="start" ref="start">
    <div class="wrapper" >
      <div class="slide">
        <div class="page">
	        <start-image :width="100" :height="25" :url="urls[0]" :direction="left" v-if="urls.length" :top="0" :text="text[0]"></start-image>
	        <start-image :width="100" :height="25" :url="urls[1]" v-if="urls.length" :top="25" :text="text[1]"></start-image>
          <start-image :width="100" :height="25" :url="urls[2]" :direction="left" v-if="urls.length" :top="50" :text="text[2]"></start-image>
          <start-image :width="100" :height="25" :url="urls[3]" v-if="urls.length" :top="75" :text="text[3]" @show="start"></start-image>
        </div>
      </div>
    </div>
	</div>
</template>

<script type="text/javascript">
  import startImage from "./startImage"
  import axios from "axios"

	export default{
		name:"start",
		data(){
			return{
        urls:[],
        left:"left",
        text:[]
			}
		},
		created(){
			axios.get("/static/data/start.json").then((res)=>{
        this.urls=res.data.startImage;
        this.text=res.data.text;
			})
		},
    methods:{
      start(){
        const start = this.$refs.start;
        start.style.animation="start 1.2s"
        start.addEventListener("animationend",()=>{
          this.$router.push("/news");
        },false)
      }
    },
		components:{
			startImage
		}
	}
</script>

<style lang="scss">
  .start{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  	width: 100%;
  	height: 100%;
  	background: #fff;
  	.wrapper{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .slide{
      	height: 100%;
      	.page{
      		width: 100%;
      		height: 100%;
      		background:#3f7aab;
      	}
      }  		
  	}
  }
  @keyframes start{
    0%{
      opacity: 100%;
      transform: scale(1,1);
    }
    100%{
      opacity: 0.3;
      transform: scale(2.5,2.5);
    }
  }
</style>