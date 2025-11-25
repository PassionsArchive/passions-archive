<script setup>
import { ref, computed, } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoggingOut = ref(false)
const userData = computed(() => authStore.userData)
const username = computed(() => userData.value?.username || 'Usuário')

const handleLogout = async () => {
  if (confirm('Tem certeza que deseja sair?')) {
    isLoggingOut.value = true
    try {
      await authStore.logout()
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      isLoggingOut.value = false
    }
  }
}

</script>

<template>
  <div class="geral">
    <h1>Perfil</h1>
    <div class="listas">
      <ul class="perfil-info">
        <li><strong>NOME DE USUÁRIO:</strong> {{ username }}</li>
        <li><strong>ID DA CONTA:</strong> {{ userData?.id }}</li>
        <li class="sair">
          <button @click="handleLogout" :disabled="isLoggingOut">
            {{ isLoggingOut ? 'SAINDO...' : 'SAIR' }}
          </button>
        </li>
      </ul>
      <ul class="contagens">
        <li>
          <button>
            SALVOS<br />
            <span class="count">0</span>
          </button>
        </li>
        <li>
          <button>
            ASSISTIDOS<br />
            <span class="count">0</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.geral {
  align-items: center;
  margin: 4vw 0 8vw 0;
  min-height: 50vh;
}

h1 {
  text-align: center;
  font-size: 4rem;
  color: #401818;
  font-family: 'Tangerine', cursive;
  font-weight: 700;
  margin-bottom: 3vw;
}

.listas {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 15vw;
  margin: 4vw 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.perfil-info {
  text-align: left;
  min-width: 300px;
}

.perfil-info li {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
}

.perfil-info li strong {
  color: #401818;
  font-weight: bold;
}

.sair {
  margin-top: 3vw;
  text-align: center;
}

.sair button {
  background-color: #401818;
  color: #fff;
  border: none;
  padding: 0.8vw 2.5vw;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.sair button:hover:not(:disabled) {
  background-color: #8b3c3c;
  transform: scale(1.05);
}

.sair button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.contagens {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}

.contagens button {
  border: 2px solid black;
  background: transparent;
  padding: 1.5vw 2.5vw;
  font-weight: bold;
  border-radius: 10px;
  width: 14vw;
  min-width: 180px;
  font-size: 1rem;
  text-align: center;
}

.count {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

</style>
