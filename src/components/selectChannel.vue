<template>
  <div class="selectChannel">
    <div class="head">
      <h2 class="headTxt">{{profTi}}</h2>
      <div class="border_1px"></div>
    </div>
    <search :path="professors" :msg="msg"></search>
    <div class="wrapper" ref="wrapper">
      <ul class="selectList">
          <li class="border_1px diff" v-for="(professor, index) in professors" :key="index">
            <router-link class="selectItem" :to="{path:'professor/detail/'+index, params:professor}">
              <span class="img">
                <img :src="professor.img" width="64" height="64"/>
              </span>
              <div class="text">
                <p class="title">
                  <span class="name">{{professor.name}}</span>
                  <router-link :to="{path:'professor/chat/'+index, params:professor}">
                    <span class="iconfont icon-chats"></span>
                  </router-link>
                </p>
                <p class="intro">{{professor.intro}}</p>
              </div>
            </router-link>
          </li>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import {url, searchCon, titleCon} from "@/common/js/base"
  import search from "./base/search"
  const ERR_OK = 0

  export default {
    name:"selectChannel",
    components: {
       search
    },
    data() {
      return {
        professors: [],
        msg: searchCon.profCon,
        profTi: titleCon.profCon,
        cliHig: 0
      }
    },
    created() {
      this.getNew()
    },
    mounted() {
      this.$nextTick(() => {
          this._isScroll()
          if(window.innerHeight){
              this.cliHig = window.innerHeight;
          }else {
              this.cliHig = document.documentElement.clientHeight;
          }
          this.$refs.wrapper.style.height = this.cliHig - 8.9 + 'rem';
      })
    },
    methods: {
      _isScroll() {
          this.scroll = new BScroll(this.$refs.wrapper, {
              click: true
          })
      },
      getNew() {
          this.$http.get(url.news + "professors").then((res)=>{
              if(res.data.errno == ERR_OK){
                  console.log(res.data)
                  this.professors = res.data.data;
              }

          })
      }
    }
  }
</script>

<style lang="scss">
  .selectChannel{
    position: relative;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .head{
      width: 100%;
      height: 2.25rem;
      position:relative;
      background:#fff;
      text-align: center;
      line-height: 2.25rem;
      box-sizing:border-box;
      background:#fff;
      color: #1b1d1f;
      flex: 0 0 2.25rem;
      .headTxt{
        font-size: 0.9rem;
      }
      .border_1px{
        position:absolute;
        left: 0;
        bottom:0;
      }
    }
    .wrapper{
      overflow: hidden;
      .selectList{
        padding: 0 10px;
        li{
          width: 100%;
          display: block;
          &.diff {
            border: 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          }
          .selectItem{
            display: flex;
            flex-direction: row;
            padding: 15px 0;
            .img {
              flex: 0 0 76px;
              img {
                border:0;
              }
            }
            .text {
              flex: 1 1 auto;
              p {
                width: 100%;
                &.title {
                  display: flex;
                  flex-direction: row;
                  font-size: 0.8rem;
                  color: #333;
                  .name {
                    flex: 1 1 auto;
                  }
                  .iconfont {
                    flex: 0 0 1rem;
                    width: 1rem;
                    height: 1rem;
                    color: #55d532;
                  }
                }
                &.intro {
                  padding-top: 7px;
                  font-size: 0.6rem;
                  color: #999;
                  line-height: 0.8rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>