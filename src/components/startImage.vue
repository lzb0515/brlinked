<template>
	<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
		<div class="startImage" ref="image"><span class="text">{{text}}</span></div>
	</transition>
</template>

<script type="text/javascript">
	export default{
    name:"startImage",
    data(){
    	return{
    		
    	}
    },
    props:["direction","width","height","url","left","top","text"],
    created(){
      this.$nextTick(() => {
      	let oDiv = this.$refs.image;
      	oDiv.style.width=this.width+'%';
      	oDiv.style.height=this.height+'%';
      	oDiv.style.background="url("+this.url+")";
      	oDiv.style.backgroundSize="100% 100%";
      	oDiv.style.top=this.top+"%";
      })
    },
    methods:{
    	beforeEnter(el){
        if(this.direction==="left"){
        	el.style.transform="translate3d(-110%,0,0)";
        }else{
        	el.style.transform="translate3d(110%,0,0)";
        }
    	},
    	enter(el,done){
        var ss=el.offsetHeight;  //触发重绘
        el.style.transform="translate3d(0,0,0)";
        el.addEventListener("transitionend",done,false);
    	},
    	afterEnter(){
        setTimeout(() => {
          this.$emit("show");
        },1000)
    	}
    }
	}
</script>

<style lang="scss">
	.startImage{
		position:absolute;
		border:2px solid #fff;
		box-sizing:border-box;
		transition: all 900ms;
		.text{
      position:absolute;
      left: 0.3rem;
      bottom:0.4rem;
			display: block;
			font-size: 0.8rem;
      color:#fff;
		}
	}
</style>