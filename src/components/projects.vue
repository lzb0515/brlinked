<template>
  <div class="projects">
    <div class="head">
      <h2 class="headTxt">{{projTi}}</h2>
      <div class="border_1px"></div>
      <img src="http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%85%8D%E5%86%A0%E7%85%A7&step_word=&hs=2&pn=4&spn=0&di=203190891420&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3817555109%2C2484709904&os=463394034%2C3619461117&simid=4267808168%2C741044743&adpicid=0&lpn=0&ln=1952&fr=&fmq=1520876707261_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fitem.jschina.com.cn%2F2014hys%2Fhaoyishengzhanshi%2F201411%2FW020141105559678289722.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F3fgjof_z%26e3B3fvitgw_z%26e3Bv54_z%26e3BvgAzdH3Ffyfpj4AzdH3Fda89AzdH3F8dAzdH3FdnAzdH3Fadna9m898_z%26e3Bfip4s&gsm=0&rpstart=0&rpnum=0">
    </div>
    <search :path="projs" :msg="msg"></search>
    <div class="wrapper" ref="wrapper">
      <ul class="selectList">
        <li class="border_1px diff" v-for="(proj, index) in projs" :key="index">
          <router-link class="selectItem" :to="{path:'projects/detail/'+index, params:proj}">
            <span class="img">
              <img :src="proj.img" crossOrigin="Anonymous" width="64" height="64"/>
            </span>
            <div class="text">
              <p class="title">
                <span class="name">{{proj.name}}</span>
                <span class="time">2016-05-01</span>
              </p>
              <p class="intro">{{proj.intro}}</p>
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
    name: "projects",
    components: {
       search
    },
    data() {
      return {
        projs: [],
        msg: searchCon.projCon,
        projTi: titleCon.projCon,
        cliHig: 0,
        projUrl: ""
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
          this.$http.get(url.news + "projects").then((res)=>{
              if(res.data.errno == ERR_OK){
                  this.projs = res.data.data;
              }

          })
      }
    }
  }
</script>

<style lang="scss">
  .projects{
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    z-index: 0;
    .head{
      width: 100%;
      height: 2.25rem;
      position:relative;
      background:#fff;
      text-align: center;
      line-height: 2.25rem;
      box-sizing:border-box;
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
            }
            .text {
              flex: 1 1 auto;
              p {
                width: 100%;
                color: #999;
                font-size: 0.6rem;
                &.title {
                  display: flex;
                  flex-direction: row;
                  .name {
                    color: #333;
                    font-size: 0.8rem;
                    flex: 1 1 auto;
                  }
                  .time {
                    flex: 0 0 4rem;
                    text-align: right;
                  }
                }
                &.intro {
                  padding-top: 7px;
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