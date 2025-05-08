import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Interfaces
export interface Participacion {
  id: number;
  userId: number;
  eventoId: number;
  fechaInscripcion: string;
  createdAt: string;
  updatedAt: string;
  usuario?: {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    genero?: string;
    nivel: number;
  };
  evento?: {
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
  };
}

axios.defaults.withCredentials = true;

// Servicio para participaciones
export const participacionService = {
  inscribir: async (eventoId: number, userId?: number): Promise<Participacion> => {
    const data = userId ? { userId, eventoId } : { eventoId };
    
    const res = await axios.post(`${API_BASE_URL}/participaciones/inscribir`, data);
    return res.data.participacion;
  },
  

  cancelar: async (eventoId: number, userId?: number): Promise<boolean> => {
    // Si se proporciona el userId, lo usamos. Si no, el backend debería extraerlo del token
    const url = userId 
      ? `${API_BASE_URL}/participaciones/${userId}/${eventoId}`
      : `${API_BASE_URL}/participaciones/${eventoId}`;
      
    
    const res = await axios.delete(url);
    return res.data.message === 'Inscripción cancelada correctamente';
  },
  

  getMisParticipaciones: async (userId?: number): Promise<Participacion[]> => {
    let url;
    
    if (userId) {
      url = `${API_BASE_URL}/participaciones/usuario/${userId}`;
    } else {
      url = `${API_BASE_URL}/participaciones/mis-participaciones`;
      try {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          if (userData && userData.id) {
            url = `${API_BASE_URL}/participaciones/usuario/${userData.id}`;
          }
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario del localStorage:", error);
      }
    }
    
    const res = await axios.get(url);
    return res.data;
  },
  
  // Obtener todos los participantes de un evento
  getByEvento: async (eventoId: number): Promise<Participacion[]> => {
    const res = await axios.get(`${API_BASE_URL}/participaciones/evento/${eventoId}`);
    return res.data;
  },
  
  // Verificar si el usuario está inscrito en un evento
  verificarInscripcion: async (eventoId: number, userId?: number): Promise<boolean> => {
    try {
      if (userId) {
        const inscripciones = await participacionService.getMisParticipaciones(userId);
        return inscripciones.some(inscripcion => inscripcion.eventoId === eventoId);
      }
      const inscripciones = await participacionService.getMisParticipaciones();
      return inscripciones.some(inscripcion => inscripcion.eventoId === eventoId);
    } catch (error) {
      console.error("Error al verificar inscripción:", error);
      return false;
    }
  }
};