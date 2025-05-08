import axios from "axios";
import { RegisterData, User } from "../context/authContext";


const API_BASE_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Servicios para autenticación
export const authService = {
  // Registrar un nuevo usuario
  register: async (data: RegisterData): Promise<{ user: User, token: string }> => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return res.data;
  },
  
  // Iniciar sesión
  login: async (credentials: { email: string; password: string }): Promise<{ user: User, token: string }> => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return res.data;
  },
  
  // Obtener usuario actual
  getCurrentUser: async (): Promise<User> => {
    const res = await axios.get(`${API_BASE_URL}/auth/me`);
    return res.data;
  },
  
  // Cerrar sesión
  logout: async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/auth/logout`);
    localStorage.removeItem('token');
  }
};