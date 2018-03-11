<template>
	<div class="user">
    <div class="wrapper" ref="wrapper">
      <div>
      	<div class="top">
	        <div class="info">
		        <img :src="photo" class="img" ref="img">
		        <span class="name">ID: {{user.name}}</span>
            <input type="file" class="image" accept="image/*" capture="camera" ref="input"/>
	        </div>
	        <p class="sign">签名: {{user.sign}}</p>
	      </div>
	      <ul class="list">
		      <li v-for="item in items" class="item">
			      <p>{{item}}</p>
			      <div class="border_1px"></div>
		      </li>
	      </ul>
      </div>
    </div>
	</div>
</template>

<script type="text/javascript">
  import axios from "axios"
  import BScroll from "better-scroll"

  var ITEMS=["我的消息","我的关注","我的收藏","我的红包","我的发表","我的反馈","我的资料","我的设置"]

  export default {
    name:"user",
    data(){
    	return {
    		items:ITEMS,
    		user:{}
    	}
    },
    created(){
      axios.get("/static/data/user.json").then((res) => {
      	this.user=res.data;
      })
    },
    mounted(){
    	var _this=this;
    	this.$nextTick(()=>{
    		new BScroll(this.$refs.wrapper,{
    			bounce:false
    		})

        var input=this.$refs.input;
        var _this=this;
        input.onchange=function(){
          _this.changephoto();
        }
    	})
    },
    methods:{
      initphoto(){
        var photo=this.$refs.img;
        photo.src=arguments[0];
      },
      changephoto(){
        var reader=new FileReader();
        var input=this.$refs.input;
        reader.readAsDataURL(input.files[0]);
        var _this=this;
        reader.onload=function(){
          _this.initphoto(reader.result);
          localStorage.setItem("photo",reader.result);
        }
      }
    },
    computed:{
      photo(){  //用计算属性,如果用户上传过头像,那么使用用户的照片,如果没有,那么使用ajax请求的数据.
        var url = localStorage.getItem("photo");
        return url?url:this.user.picture;
      }
    }
  }
</script>

<style lang="scss">
  .user{
  	position: relative;
  	.wrapper{
  		position:absolute;
  		top: 0;
  		bottom: 2.5rem;
  		width: 100%;
  		overflow: hidden;
  		.top{
  			width: 100%;
  			height: 9.0rem;
  			padding: 2.5rem 0.75rem 0.75rem 0.75rem;
  			box-sizing:border-box;
  			background: #90c6ef;
  			.info{
          position:relative;
  				font-size: 0;
  				margin-bottom: 1.0rem;
          .img{
          	display: inline-block;
          	width: 3.0rem;
          	height: 3.0rem;
          	border-radius:50%;
          	margin-right: 1.2rem;
          }
          .image{
            position:absolute;
            width: 3.0rem;
            height: 3.0rem;
            border-radius:50%;
            left: 0;
            top: 0;
            opacity: 0;
            z-index: 20;
          }
          .name{
          	display: inline-block;
          	height: 100%;
          	line-height: 3.0rem;
          	font-size: 1.2rem;
          	color: black;
          	vertical-align: top;
          }
  			}
  		}
  		.list{
  			padding: 0.5rem;
  			padding-bottom:0;
        .item{
        	height: 2.5rem;
        	line-height: 2.5rem;
        	font-size: 0.9rem;
        }
  		}
  	}
  }
</style>