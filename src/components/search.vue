<template>
  <div class="search">
	  <div class="wrapper" ref="wrapper">
		  <div class="result">
			<h3 class="hotNews">今日热点</h3>
			<ul class="resultList">
				<li class="listItem" v-for="(item,index) in newsItems">
					<span class="index">{{index+1}}.</span>
					<div class="newsTitle">
						<p class="titleText">{{item}}</p>
						<div class="border_1px"></div>
					</div>
				</li>
			</ul>
		  </div>
	  </div>
  </div>
</template>

<script>
  import axios from "axios"
  import BScroll from "better-scroll"

  export default {
    name:"search",
    data(){
    	return{
    		value:"",
    		newsItems:[],
    		focusItems:[]
    	}
    },
    methods:{
    	clear(){
    		this.value="";
    		this.$refs.input.blur();
    		this.newsItems = this.focusItems;
    	},
    	search(){
    		if(!this.value){
    			this.newsItems = this.focusItems;
    			return;
    		}
    		axios.get("/api",{
    			params:{
    				wd:this.value
    			}
    		}).then((res) => {
    	    const re = /\[.+]/;
    	    var data = res.data.match(re);  
    	    //得到的是jsonp数据,正则匹配得到需要的数据字符串.
    	    if(!data){
    	    	return
    	    }
    	    this.newsItems = data[0].replace(/\[|]|"/g,"").split(",");
    		});
    	},
    	resultPage(){
        if(this.value){
        	window.open("https://www.baidu.com/s?wd="+this.value,"_self")
        }
    	}
    },
    updated(){
    	this.$nextTick(() => {
  			this.scroll=new BScroll(this.$refs.wrapper,{
    			click:true,
    			bounce:false
    		})
    	});
    },
    created(){
    	axios.get("/static/data/search.json").then((res) => {
    		this.focusItems=res.data.focus;
    		this.newsItems = this.focusItems;
    	})
    }
  }
</script>

<style lang="scss">
	.search{
		padding:0 0.5rem;
		width: 100%;
		height: 100%;
		box-sizing:border-box;
		display: flex;
		flex-direction: column;
		.wrapper{
			overflow: hidden;
			.result{
				padding: 0 0.5rem;
				.hotNews{
					text-align: center;
					height: 1.0rem;
					line-height: 1.0rem;
					font-size: 0.7rem;
				}
				.resultList{
					.listItem{
						display: flex;
						height: 2.0rem;
						line-height: 2.0rem;
						font-size: 0.8rem;
						.index{
							flex: 0 1.5rem;
							text-align: center;
						}
						&:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3){
							.index{
								color: red;
							}
						}
						.newsTitle{
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>