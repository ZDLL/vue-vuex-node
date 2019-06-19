import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path:"/home",
      name:"home",
      // redirect: '/home/adduser',
      component: () => import('./views/home.vue'),
      children:[
        {
          path:'/home/adduser',
          name:"home_adduser",
          component:()=>import('./views/adduser.vue')
        },{
          path:'/home/addlist',
          name:"home_addlist",
          component:()=>import('./views/addlist.vue')
        }
      ]
    }
  ]
})
