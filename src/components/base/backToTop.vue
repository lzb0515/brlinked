<template>
  <div class="backToTop">
    <div class="backBtn" v-html="text"></div>
  </div>
</template>

<script>
  export default {
  	name:"backToTop",
  	props:{
  		text:{
  			type:String,
  			default:"返回<br/>顶部"
  		}
  	}
  }
</script>

<style lang="scss">
  .backToTop{
  	position: fixed;
  	right: 1.8rem;
  	bottom:4.5rem;
  	width: 2.5rem;
		height: 2.5rem;
  	background: rgba(7,17,27,.4);
  	border-radius: 50%;
  	display: table;
  	.backBtn{
  		vertical-align: middle;
  		display: table-cell;
  		text-align: center;
  		color:#fff;
  		line-height: 0.8rem;
  		font-size: 0.6rem;
  		font-weight: 700;
  	}
  }
</style>