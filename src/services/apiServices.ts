import axios from "axios";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;


interface RegisterData {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  genero?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  genero?: string;
  tipoUsuario: string;
  nivel: number;
  createdAt: string;
  updatedAt: string;
  equipoId?: number;
}

// Tipos para eventos
interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  fecha: string;
  nivelDificultad: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
  imagenUrl: string;
  destacado: boolean;
  createdAt: string;
  updatedAt: string;
  participantes?: any[];
}

// Tipo para opciones de filtro
interface FilterOptions {
  nivelesDificultad: string[];
  ciudades: string[];
}

// Interfaz para parámetros de búsqueda
interface SearchParams {
  nombre?: string;
  ciudad?: string;
  nivelDificultad?: string;
  destacado?: boolean;
  ordenarPor?: string;
  orden?: 'asc' | 'desc';
}

// Servicios para autenticación y usuarios
export const authService = {
  register: async (data: RegisterData): Promise<User> => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return res.data;
  },
  login: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return res.data;
  },
};

// Servicios para eventos
export const eventoService = {

  getProximos: async (cantidad: number = 6): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/proximos`, {
      params: { cantidad }
    });
    return res.data;
  },
  // Obtener todos los eventos
  getAll: async (): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/`);
    return res.data;
  },
  
  // Obtener un evento por su ID
  getById: async (id: number): Promise<Evento> => {
    const res = await axios.get(`${API_BASE_URL}/evento/${id}`);
    return res.data;
  },
  
  // Crear un nuevo evento
  create: async (data: FormData): Promise<Evento> => {
    const res = await axios.post(`${API_BASE_URL}/evento/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  
  // Eliminar un evento
  delete: async (id: number): Promise<boolean> => {
    await axios.delete(`${API_BASE_URL}/evento/${id}`);
    return true;
  },
  
  // Buscar eventos por nombre
  searchByName: async (nombre: string): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/buscar/nombre`, {
      params: { nombre }
    });
    return res.data;
  },
  
  // Filtrar eventos por nivel de dificultad
  filterByDifficulty: async (nivel: string): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/filtrar/dificultad`, {
      params: { nivel }
    });
    return res.data;
  },
  
  // Filtrar eventos por ciudad
  filterByCity: async (ciudad: string): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/filtrar/ciudad`, {
      params: { ciudad }
    });
    return res.data;
  },
  
  // Ordenar eventos por nombre
  orderByName: async (orden: 'asc' | 'desc' = 'asc'): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/ordenar/nombre`, {
      params: { orden }
    });
    return res.data;
  },
  
  // Obtener opciones de filtrado (ciudades y niveles de dificultad)
  getFilterOptions: async (): Promise<FilterOptions> => {
    const res = await axios.get(`${API_BASE_URL}/evento/filtros/opciones`);
    return res.data;
  },
  
  // Búsqueda y filtrado avanzado con múltiples criterios
  search: async (params: SearchParams): Promise<Evento[]> => {
    const res = await axios.get(`${API_BASE_URL}/evento/buscar`, { params });
    return res.data;
  }
};