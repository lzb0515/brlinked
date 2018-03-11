<template>
    <div class="footer">
        <div class="border_1px"></div>
        <div class="option">
            <router-link to="/news" class="items">
                <span class="icon icon-copy"></span>
                <span class="text">新闻</span>
            </router-link>
            <router-link to="/select" class="items">
                <span class="icon icon-insert-template"></span>
                <span class="text">专家</span>
            </router-link>
            <router-link to="/search" class="items">
                <span class="icon icon-video-camera"></span>
                <span class="text">搜索</span>
            </router-link>
            <router-link :to="url" class="items" v-tap="{methods:user}" ref="link">
                <span class="icon icon-spinner10"></span>
                <span class="text">我的</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        methods:{
            user(){
                if(this.account.length){
                    this.$router.push("/user")
                }else{
                    this.$router.push("/login")
                }
            }
        },
        computed:{
            account(){
                return this.$store.state.accounts;
            },
            url(){
                return this.$store.state.accounts.length>0?"/user":"/login"
            }
        }
    }
</script>

<style scoped lang="scss">
    .footer{
        width: 100%;
        height: 2.3rem;
        box-sizing: border-box;
        background: rgba(232,193,119,.7);
        .option{
            display: flex;
            flex-direction: row;
            padding:0 1.0rem;
            height:100%;
            font-size:0;
            align-items:center;
            .items{
                flex: auto;
                display: inline-block;
                text-align: center;
                color: #131517;
                font-size:0.8rem;
                vertical-align: bottom;
                .icon{
                    margin: 0.1rem;
                }
                .text{
                    font-size:0.9rem;
                    padding-left: 0.1rem;
                }
            }
        }
    }
</style>