// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import vTap from "v-tap"
import store from "./store"
import "swiper/dist/css/swiper.min.css"
import "@/common/js/initRem.js"
import axios from 'axios';
require('!vue-style-loader!css-loader!sass-loader!./common/style/index.scss')
Vue.prototype.$http = axios;

Vue.use(VueLazyload, {
    loading: require('./common/image/default.png')
})
fastclick.attach(document.body);

Vue.use(vTap);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
