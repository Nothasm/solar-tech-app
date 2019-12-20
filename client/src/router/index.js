import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/templates/Main.vue'
import Clients from '../components/Clients.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
    children: [
      {
        name: 'home',
        path: '/',
        component: Clients
      },
      {
        name: 'client',
        path: '/client',
        component: Clients
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
