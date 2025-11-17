<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const success = await authStore.login(username.value, password.value)

    if (success) {
      // Login bem-sucedido
      const redirectTo = route.query.redirect || '/perfil'
      router.push(redirectTo)
    } else {
      // Erro no login
      errorMessage.value = authStore.error || 'Usuário ou senha incorretos'
    }
  } catch (error) {
    errorMessage.value = 'Erro ao fazer login. Tente novamente.'
    console.error('Erro no login:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="geral">
    <h2>Log-In</h2>
    <p>
      SÓ É POSSÍVEL FAZER LOGIN SE VOCÊ TIVER UMA<br />
      CONTA NO TMDB
    </p>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleSubmit">
      <ul>
        <li class="email">
          <label for="username">USUÁRIO:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :disabled="isSubmitting"
            required
          />
        </li>
        <li>
          <label for="senha">SENHA:</label>
          <input
            type="password"
            id="senha"
            v-model="password"
            :disabled="isSubmitting"
            required
          />
        </li>
      </ul>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'ENTRANDO...' : 'ENTRAR' }}
      </button>
    </form>

    <div class="register-link">
      <p>
        Não tem uma conta no TMDB?
        <a href="https://www.themoviedb.org/signup" target="_blank">Criar conta</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.geral {
  align-items: center;
  margin: 4vw 0 8vw 0;
}

h2 {
  font-family: 'Tangerine', cursive;
  font-size: 5rem;
  color: #401818;
  text-align: center;
}

p {
  font-size: 1.3rem;
  text-align: center;
  color: black;
  font-weight: 900;
  margin-bottom: 3vw;
  margin-top: 5px;
  font-family: 'Playfair Display SC', serif;
}

.error-message {
  color: rgb(255, 255, 255);
  background-color: #401818;
  padding: 1rem;
  border-radius: 6px;
  margin: 2vw auto;
  max-width: 400px;
  text-align: center;
  font-weight: bold;
  border: 2px solid;
}

form {
  text-align: center;
  align-items: center;
}

ul {
  padding: 0;
  margin: 0;
}

ul li {
  color: black;
  font-weight: 900;
  list-style: none;
  margin-bottom: 1.5vw;
}

li.email {
  margin-bottom: 1.5vw;
}

label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
  text-align: right;
  margin-right: 10px;
}

input {
  padding: 8px 20px;
  background-color: #ebebeb;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 250px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #401818;
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 2vw;
  min-width: 150px;
}

button:hover:not(:disabled) {
  background-color: #8b3c3c;
  color: #fff;
  transform: scale(1.05);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.register-link {
  margin-top: 3vw;
  text-align: center;
  text-transform: uppercase;
}

.register-link p {
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
}

.register-link a {
  color: #401818;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #8b3c3c;
}
</style>
