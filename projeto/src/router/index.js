import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView },
  {
    path: '/final',
    name: 'FinalPage',
    component: () => import('@/components/FinalPageComponent.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
