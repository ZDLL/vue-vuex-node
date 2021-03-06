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
          path:'/home/userList',
          name:"home_userList",
          component:()=>import('./views/userList.vue')
        },
        {
          path:'/home/managerList',
          name:"home_managerList",
          component:()=>import('./views/managerList.vue')
        }
      ]
    }
  ]
})
