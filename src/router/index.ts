import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/room',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'portal',
      component: () => import("@/views/PortalView.vue")
    },
    {
      path: '/hall',
      name: 'roomlist',
      component: () => import("@/views/ShowRoomsView.vue")
    }
  ]
})

export default router
