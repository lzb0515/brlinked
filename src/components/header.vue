<template>
	<div class="header">
		<div @click="goBack()" class="iconfont icon-goback goBack"></div>
		<div class="headerTitle">
			<h2>
				百域联达
			</h2>
		</div>
		<div @click="goUser()" class="iconfont icon-user goUser"></div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data(){
			return {

			}
		},
		methods: {
            goBack() {
                this.$router.go(-1)
			},
            goUser() {
				if(true){
				   this.$router.push('/login')
				}else{

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.header{
		height: 2.3rem;
		line-height: 2.3rem;
		text-align: center;
		background: #f90;
		color: #fff;
		display: flex;
		flex-direction: row;
		.goBack, .goUser {
			flex: 0 0 2rem;
			font-size: 1.1rem;
			font-weight: 600;
		}
		.headerTitle {
			flex: 1 1 auto;
		}
	}
</style>