import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      inMenu: false
    }
  },
  {
    path: '/words',
    name: 'words',
    component: () => import('../views/WordsView.vue'),
    meta: {
      inMenu: true,
      menuTitle: 'Слова'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
