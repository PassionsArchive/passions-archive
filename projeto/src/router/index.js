// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/final',
    name: 'FinalPage',
    component: () => import('@/components/FinalPageComponent.vue'),
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/views/PerfilView.vue'),
    meta: { requiresAuth: true } // Requer autenticação
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { redirectIfAuth: true } // Redireciona se já estiver logado
  },
  {
    path: '/emotions',
    name: 'Emotions',
    component: () => import('@/views/EmotionsView.vue'),
  },
  {
    path: '/movie/:movieId',
    name: 'Details',
    component: () => import('@/views/DetailsView.vue'),
    props: true,
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0, left: 0 }
    }
  },
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Não está logado, redireciona para login
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      // Está logado, permite acesso
      next()
    }
  }
  // Verifica se a rota deve redirecionar se já estiver autenticado (ex: página de login)
  else if (to.meta.redirectIfAuth && authStore.isAuthenticated) {
    // Já está logado, redireciona para perfil
    next({ name: 'Perfil' })
  }
  else {
    // Rota pública, permite acesso
    next()
  }
})

export default router
