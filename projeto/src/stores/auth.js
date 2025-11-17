// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/plugins/axios';

export const useAuthStore = defineStore('auth', () => {
  const sessionId = ref(null);
  const accountId = ref(null);
  const userData = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed para verificar se está autenticado
  const isAuthenticated = computed(() => !!sessionId.value)

  // Carregar dados do localStorage ao inicializar
  const loadFromStorage = () => {
    const storedSessionId = localStorage.getItem('tmdb_session_id');
    const storedAccountId = localStorage.getItem('tmdb_account_id');
    const storedUserData = localStorage.getItem('tmdb_user_data');

    if (storedSessionId) {
      sessionId.value = storedSessionId;
      accountId.value = storedAccountId;
      if (storedUserData) {
        userData.value = JSON.parse(storedUserData);
      }
    }
  };

  // Salvar no localStorage
  const saveToStorage = () => {
    if (sessionId.value) {
      localStorage.setItem('tmdb_session_id', sessionId.value);
      localStorage.setItem('tmdb_account_id', accountId.value);
      localStorage.setItem('tmdb_user_data', JSON.stringify(userData.value));
    }
  };

  // Limpar localStorage
  const clearStorage = () => {
    localStorage.removeItem('tmdb_session_id');
    localStorage.removeItem('tmdb_account_id');
    localStorage.removeItem('tmdb_user_data');
  };

  // Passo 1: Criar Request Token
  const createRequestToken = async () => {
    try {
      const response = await api.get('authentication/token/new');
      return response.data.request_token;
    } catch (err) {
      console.error('Erro ao criar request token:', err);
      throw err;
    }
  };

  // Passo 2: Validar com Login e Senha
  const validateWithLogin = async (username, password, requestToken) => {
    try {
      const response = await api.post('authentication/token/validate_with_login', {
        username,
        password,
        request_token: requestToken
      });
      return response.data.request_token;
    } catch (err) {
      console.error('Erro ao validar login:', err);
      error.value = 'Usuário ou senha incorretos';
      throw err;
    }
  };

  // Passo 3: Criar Session ID
  const createSession = async (requestToken) => {
    try {
      const response = await api.post('authentication/session/new', {
        request_token: requestToken
      });
      return response.data.session_id;
    } catch (err) {
      console.error('Erro ao criar sessão:', err);
      throw err;
    }
  };

  // Passo 4: Buscar dados da conta
  const getAccountDetails = async (sessionId) => {
    try {
      const response = await api.get('account', {
        params: {
          session_id: sessionId
        }
      });
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar dados da conta:', err);
      throw err;
    }
  };

  // Função principal de login
  const login = async (username, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Passo 1: Criar request token
      const requestToken = await createRequestToken();

      // Passo 2: Validar com login e senha
      const validatedToken = await validateWithLogin(username, password, requestToken);

      // Passo 3: Criar session ID
      const newSessionId = await createSession(validatedToken);
      sessionId.value = newSessionId;

      // Passo 4: Buscar dados da conta
      const accountData = await getAccountDetails(newSessionId);
      accountId.value = accountData.id;
      userData.value = {
        id: accountData.id,
        username: accountData.username,
        name: accountData.name,
        avatar: accountData.avatar?.tmdb?.avatar_path || accountData.avatar?.gravatar?.hash,
        iso_639_1: accountData.iso_639_1,
        iso_3166_1: accountData.iso_3166_1
      };

      // Salvar no localStorage
      saveToStorage();

      return true;
    } catch (err) {
      error.value = err.response?.data?.status_message || 'Erro ao fazer login';
      console.error('Erro no login:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      if (sessionId.value) {
        // Deletar sessão no TMDB
        await api.delete('authentication/session', {
          data: {
            session_id: sessionId.value
          }
        });
      }
    } finally {
      // Limpar dados locais
      sessionId.value = null;
      accountId.value = null;
      userData.value = null;
      clearStorage();
    }
  };

  // Verificar se a sessão ainda é válida
const validateSession = async () => {
  if (!sessionId.value) return false;

  try {
    // Faz uma requisição simples para validar a sessão
    await api.get('account', {
      params: { session_id: sessionId.value }
    });
    return true;
  } catch (err) {
    console.error('Sessão inválida', err);
    await logout();
    return false;
  }
};

// Inicializar ao criar o store
loadFromStorage();

return {
  sessionId,
  accountId,
  userData,
  isLoading,
  error,
  isAuthenticated,
  login,
  logout,
  validateSession,
  loadFromStorage
};
});
