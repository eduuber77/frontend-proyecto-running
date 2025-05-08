import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  genero?: string;
  tipoUsuario: 'ESTANDAR' | 'CORREDOR';
  nivel: number;
  equipoId?: number;
}

// Definir tipo para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Datos para registro
export interface RegisterData {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  genero?: string;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  axios.defaults.withCredentials = true;
  const loadUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        return JSON.parse(storedUser);
      }
    } catch (error) {
    }
    return null;
  };

  // Verificar la autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        const storedUser = loadUserFromStorage();
        if (storedUser) {
          setUser(storedUser);
          setError(null);
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${API_BASE_URL}/auth/me`);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status !== 401) {
          setError('Error al verificar la autenticación');
        }
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de inicio de sesión
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al iniciar sesión');
      } else {
        setError('Error desconocido al iniciar sesión');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      
      // Guardar usuario 
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al registrar');
      } else {
        setError('Error desconocido al registrar');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de cierre de sesión
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/auth/logout`);
      
      // Eliminar datos de sesión
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.clear();
      
      // Limpiar errores
      setError(null);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};