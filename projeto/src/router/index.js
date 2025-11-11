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
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/views/PerfilView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/emotions',
    name: 'Emotions',
    component: () => import('@/views/EmotionsView.vue'),
  },
  {
  path: '/movie/:id',
  name: 'Details',
  component: () => import('@/views/DetailsView.vue'),
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
   scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition; // Restore saved position on back/forward
            } else if (to.hash) {
                // Scroll to the element specified by the hash
                return {
                    el: to.hash,
                    behavior: 'smooth' // Enable smooth scrolling
                };
            } else {
                // Scroll to the top of the page for other navigations
                return { top: 0, left: 0 };
            }
        }
})

export default router
