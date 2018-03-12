import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import news from "../components/news"
import user from "../components/user"
import projects from "../components/projects"
import professor from "../components/selectChannel"
import start from "../components/start"
import login from "../components/login"
import item from "../components/base/item"
import chat from "../components/base/chat"

import focusNews from "../components/channels/focusNews"
import vedio from "../components/channels/vedio"
import heBei from "../components/channels/heBeiProvince"
import internation from "../components/channels/internation"
import economy from "../components/channels/economy"
import military from "../components/channels/military"

const newsChildrenRoutes=[    //新闻页 频道(子路由)
  {path:"",component:focusNews,redirect:"focusNews"},
  {path:":id",component:focusNews},
  {path:"vedio",component:vedio},
  {path:"heBei",component:heBei},
  {path:"internation",component:internation},
  {path:"economy",component:economy},
  {path:"military",component:military}
]

const routes=[
  {path:"/",component:news,redirect:"/start"},
  {path:"/start",component:start},
  {path:"/login",component:login},
  {
    path:"/projects",
    component:projects,
    children: [
    {
        path: 'detail/:item',
        component: item
    }
]
  },
  {path:"/user",component:user},
  {path:"/news",component:news,children:newsChildrenRoutes},
  {
    path:"/professor",
    component:professor,
    children: [
      {
        path: 'detail/:item',
        component: item
      },
      {
         path: 'chat/:item',
         component: chat
      }
    ]
  }
]

export default new VueRouter({
  routes,
  linkActiveClass:"active"
})
