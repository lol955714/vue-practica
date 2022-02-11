import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import contador from '../components/novelas/contadorWatch.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: index
  },
  {
    path: '/contador',
    name: 'contador',
    component: contador
  }
]

const router = new VueRouter({
  routes
})

export default router
