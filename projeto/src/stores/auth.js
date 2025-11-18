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

  const isAuthenticated = computed(() => !!sessionId.value)

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

  const saveToStorage = () => {
    if (sessionId.value) {
      localStorage.setItem('tmdb_session_id', sessionId.value);
      localStorage.setItem('tmdb_account_id', accountId.value);
      localStorage.setItem('tmdb_user_data', JSON.stringify(userData.value));
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('tmdb_session_id');
    localStorage.removeItem('tmdb_account_id');
    localStorage.removeItem('tmdb_user_data');
  };

  const createRequestToken = async () => {
    try {
      const response = await api.get('authentication/token/new');
      return response.data.request_token;
    } catch (err) {
      console.error('Erro ao criar request token:', err);
      throw err;
    }
  };

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

  const login = async (username, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      const requestToken = await createRequestToken();
      const validatedToken = await validateWithLogin(username, password, requestToken); // Passo 3: Criar session ID
      const newSessionId = await createSession(validatedToken);
      sessionId.value = newSessionId;
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
  const logout = async () => {
    try {
      if (sessionId.value) {
        await api.delete('authentication/session', {
          data: {
            session_id: sessionId.value
          }
        });
      }
    } finally {
      sessionId.value = null;
      accountId.value = null;
      userData.value = null;
      clearStorage();
    }
  };

const validateSession = async () => {
  if (!sessionId.value) return false;

  try {
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
