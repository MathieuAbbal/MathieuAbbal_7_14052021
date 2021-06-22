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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
