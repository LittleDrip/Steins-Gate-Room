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

router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/authStore');
  const authStore = useAuthStore();
  if (to.path === '/room' && !authStore.isLoggedIn) {
    next('/hall'); // 重定向到 /a
  } else {
    next(); // 允许导航
  }
});

export default router
