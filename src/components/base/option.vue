<template>
  <div class="options">
    <div class="iconBox" v-for="(item,index) in items">
      <div class="icon" v-tap="{methods:change,item:item}">
	      <p class="iconText">{{item.page}}</p>
	      <span v-if="close" class="close">x</span>
	    </div>
    </div>
    <div class="noMore" v-show="hide">暂无更多频道</div>
  </div>
</template>

<script>
	export default {
		name:"options",
		props:{
			items:{
				type:Array,
				default(){
					return []
				}
			},
			close:{
				type:Boolean,
				default:false
			}
		},
		methods:{
          change(params){
            this.$store.dispatch("change",params.item)
          }
		},
		computed:{
			hide(){
				return this.items.length===0?true:false;
			}
		}
	}
</script>

<style lang="scss">
  .options{
  	padding:0.5rem 0.5rem 2.0rem 0.5rem;
  	overflow: hidden;
  	.iconBox{
  		float: left;
  		display: flex;
  		justify-content: center;
  		padding: 0.5rem 0;
  		width: 25%;
  		background:#fff;
  		.icon{
  			position: relative;
  			text-align: center;
	  		.iconText{
	  			width: 3.3rem;
		  		height: 1.5rem;
		  		border-radius:0.15rem;
		  		background: rgba(7,17,27,.1);
		  		line-height: 1.5rem;
		  		font-size: 0.8rem;
	  		}
	  		.close{
	  			position:absolute;
	  			right: -0.3rem;
	  			top: -0.3rem;
	  			width: 0.7rem;
	  			height: 0.7rem;
	  			line-height: 0.6rem;
	  			border-radius:50%;
	  			font-size: 0.7rem;
	  			background:#fff;
	  			border:1px solid rgba(7,17,27,.1);
	  			font-weight: 200;
	  		}
	  	}
	  	&:first-child{
	  		.close{
	  			display: none;
	  		}
	  	}
  	}
  	.noMore{
  		text-align: center;
  		margin:1.0rem 0 2.0rem 0;
  		padding:0.5rem 0;
  		font-size: 1.0rem;
  		color: black;
      background:rgba(7,17,27,.2);
  	}
  }
</style>