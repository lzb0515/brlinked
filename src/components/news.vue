<template>
  <div class="news">
    <div class="title">
        <div class="wrapper" ref="channel">
          <ul ref="ul">
              <li class="items" v-for="(item,index) in channels" :key="index">
                <router-link :to="{path:item.path,params:{id:item.path}}"  class="channelItem">{{item.page}}</router-link>
              </li>

          </ul>
        </div>
	    <div class="border_1px"></div>
    </div>
    <keep-alive>
       <router-view class="channelView"></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import Bscroll from "better-scroll"
  import { newsTitles } from '../common/js/base'
  const ERR_OK = 0
  export default {
    name:"news",
    data(){
      return {
        channels: [],
        liWidth:{
        	type: Number
        }
      }
    },
    created(){
      this.channels = newsTitles.default;
    },
    mounted(){
      this.$nextTick(() => {
      	this._initScroll()
      })
    },
    methods:{
      _initScroll(){
          const oUl = this.$refs.ul;
          let widths = 0;
          for(let i = 0; i < this.channels.length; i++) {
              widths += oUl.getElementsByTagName("li")[i].clientWidth;
          }

          oUl.style.width = widths+"px";
          console.log(oUl.style.width);
        this.scroll = new Bscroll(this.$refs.channel,{
          scrollX:true,
          bounce:false,
          click:true,
          pullUpLoad:true
        });
      }
    }
  }
</script>

<style lang="scss">
  .news{
      display: flex;
      flex-direction: column;
    .title{
	    width:100%;
	    height:2.0rem;
	    background:#fff;
        flex: 0 0 2.0rem;
	    .border_1px{
	    }
	    .wrapper{
	      width:100%;
	      height:100%;
	      overflow:hidden;
	      box-sizing:border-box;
	      .items{
	        display:inline-block;
	        height:2.0rem;
	        line-height:2.0rem;
	        padding:0 0.4rem;
	        text-align:center;
	        font-size:0.9rem;
	        .channelItem{
	          display:block;
	          width:100%;
	          height:100%;
	          box-sizing:border-box;
	          font-weight:700;
		        color:#848586;
		        &.active{
		          border-bottom:0.15rem solid #1886da;
		          color:#333;
		        }
	        }
	      }
	    }
	  }
	  .channelView{
		  width: 100%;
		  overflow: hidden;
		  background:#fff;
          flex: 1 1 auto;
	  }
  }
  .slide-enter-active, .slide-leave-active{
      transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to{
      transform: translate3d(100%, 0, 0)
  }
</style>

