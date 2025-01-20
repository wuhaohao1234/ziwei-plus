import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FourteenStars from '../views/FourteenStars.vue'
import MajorStarDetail from '../views/MajorStarDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/twelve-houses',
    name: 'TwelveHouses',
    component: () => import('../views/TwelveHouses.vue')
  },
  {
    path: '/fourteen-stars',
    name: 'FourteenStars',
    component: FourteenStars,
    meta: {
      searchKeywords: ['紫微星', '天机星', '太阳星', '武曲星'] // 用于搜索功能
    }
  },
  {
    path: '/fourteen-stars/:id',
    name: 'MajorStarDetail',
    component: MajorStarDetail,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 