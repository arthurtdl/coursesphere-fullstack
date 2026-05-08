import api from './api';
import type { RegisterCredentials } from '@/types/user';

const TOKEN_KEY = "@CourseSphere:token";
const USER_KEY = "@CourseSphere:user";

export const authService = {
  /**
   * Realiza o login e persiste os dados no storage
   */
  async login(credentials: { email: string; password: string }) {
    const { data } = await api.post('/auth/login', credentials);

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    
    return data;
  },

  /*
   Limpa os dados e redireciona
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },

  /*
   Recupera o usuário logado
   */
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /*
  Checa se existe um token salvo
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  async register(userData: RegisterCredentials) {
    const { data } = await api.post('/users', {user: userData});

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    return data;
  }

};