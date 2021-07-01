import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
//création des routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Singup',
    component: () => import('../views/Signup.vue')
  },
  {
    path:'/post/:id',
    name:'Post',
    component:() => import('../views/Post.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component:() => import('../views/Profile.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component:() => import('../views/Users.vue')
  },
  {
    path: '/allposts',
    name: 'Allpostuser',
    component:() => import('../views/Allpostuser.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
