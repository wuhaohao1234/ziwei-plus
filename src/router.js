import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import FourteenStars from './views/FourteenStars.vue'
import MinorStars from './views/MinorStars.vue'
import MajorStarDetail from './views/MajorStarDetail.vue'
import MinorStarDetail from './views/MinorStarDetail.vue'
import TwelveHouses from './views/TwelveHouses.vue'
import Documentation from './views/Documentation.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/fourteen-stars',
      name: 'FourteenStars',
      component: FourteenStars
    },
    {
      path: '/fourteen-stars/:id',
      name: 'MajorStarDetail',
      component: MajorStarDetail
    },
    {
      path: '/minor-stars',
      name: 'MinorStars',
      component: MinorStars
    },
    {
      path: '/minor-stars/:id',
      name: 'MinorStarDetail',
      component: MinorStarDetail
    },
    {
      path: '/twelve-houses',
      name: 'TwelveHouses',
      component: TwelveHouses
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation
    }
  ]
})

export default router 