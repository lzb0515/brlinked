<template>
    <div class="search">
        <div class="searchBox">
            <span class="icon-search iconfont" v-tap="{methods:resultPage}"></span>
            <div class="searchInput">
                <input type="text" :placeholder="msg" class="input" v-model="value" ref="input" @input="search"/>
                <span class="clear" v-show="value.length" v-tap="{methods:clear}">x</span>
            </div>
        </div>
        <div class="border_1px"></div>
    </div>
</template>

<script>
    import {url} from "@/common/js/base"

    export default {
        name: "search",
        data(){
            return {
                value: ""
            }
        },
        props:[
           'path',
            'msg'
        ],
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
                this.$http.get("/api",{
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
        }
    }
</script>

<style scoped lang="scss">
    .search {
        width: 100%;
        box-sizing:border-box;
        padding-top: 0.5rem;
        flex: 0 0 1rem;
        .searchBox{
            width: 100%;
            display: flex;
            height: 1.0rem;
            padding:0 0.5rem 0.5rem;
            .iconfont {
                flex: 0 1.5rem;
                font-size: 1.0rem;
            }
            .searchInput {
                flex: 1;
                padding-right: 2.5rem;
                position: relative;
                .input {
                    width: 100%;
                    display: block;
                    height: 100%;
                    color: red;
                    font-size: 0.8rem;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 0 rgba(0, 0, 0, .6);
                    border: none;
                    outline: none;
                }
                .clear {
                    position: absolute;
                    width: 0.8rem;
                    height: 0.8rem;
                    border-radius: 50%;
                    background: silver;
                    right: 1.20rem;
                    top: 0.15rem;
                    text-align: center;
                    line-height: 0.70rem;
                    font-size: 0.7rem;
                }
            }
        }
    }

</style>