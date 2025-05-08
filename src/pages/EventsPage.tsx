import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import EventsList from '../components/events/EventsList';
import toast from 'react-hot-toast';
import { participacionService } from '../services/participacion';
import { useAuth } from '../context/authContext';
import { Evento } from '../types';
import useEventos from '../hooks/useEventos';
import fondoPies from "../assets/fondo-corriendo.png";

/**
 * pagina de eventos, muestra eventos proximos
 */

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estados
  const [inscribiendose, setInscribiendose] = useState<number | null>(null);
  const [eventosInscritos, setEventosInscritos] = useState<number[]>([]);
  
  // Verificar autenticación
  let isAuthenticated = false;
  let userId = null;
  
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    userId = auth.user?.id || null;
  } catch (error) {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        isAuthenticated = true;
        const userData = JSON.parse(userStr);
        userId = userData.id;
      }
    } catch (e) {
      console.error('Error al verificar localStorage:', e);
    }
  }
  
  // Obtener eventos y funciones usando el hook personalizado
  const {
    eventosProximos,
    loading,
    error,
    cargarProximosEventos
  } = useEventos();
  
  // Si el usuario está autenticado, verificar sus inscripciones
  useEffect(() => {
    const verificarInscripciones = async () => {
      if (!isAuthenticated) return;
      
      try {
        // Obtener eventos en los que el usuario está inscrito
        const participaciones = await participacionService.getMisParticipaciones(userId);
        
        const idsEventosInscritos = participaciones
          .map(p => p.evento?.id || p.eventoId)
          .filter((id): id is number => id !== undefined);
        
        setEventosInscritos(idsEventosInscritos);
      } catch (error) {
        console.error('Error al verificar inscripciones:', error);
      }
    };
    
    if (isAuthenticated) {
      verificarInscripciones();
    }
  }, [isAuthenticated, userId]);
  
  // Cargar los próximos eventos al montar el componente
  useEffect(() => {
    cargarProximosEventos(6); // Cargar 6 eventos
  }, [cargarProximosEventos]);
  
  // Verificar si hay un evento pendiente para inscribir después de login
  useEffect(() => {
    const checkPendingRegistration = async () => {
      if (isAuthenticated) {
        const eventoId = localStorage.getItem('eventoParaInscribir');
        if (eventoId) {
          try {
            await handleInscripcion(parseInt(eventoId));
            // Limpiar después de inscribir
            localStorage.removeItem('eventoParaInscribir');
            localStorage.removeItem('redirectAfterLogin');
          } catch (error) {
            console.error('Error al inscribir automáticamente:', error);
          }
        }
      }
    };
    
    checkPendingRegistration();
  }, [isAuthenticated]);
  
  // Función para manejar la inscripción a un evento
  const handleInscripcion = async (eventoId: number) => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      // Guardar el ID del evento para redirigir después del login
      localStorage.setItem('eventoParaInscribir', eventoId.toString());
      localStorage.setItem('redirectAfterLogin', location.pathname);
      
      toast('Para inscribirte a este evento, primero debes iniciar sesión');
      navigate('/login', { 
        state: { 
          from: location.pathname,
          inscribirEvento: eventoId 
        }
      });
      return;
    }
    
    try {
      setInscribiendose(eventoId);
      
      // Llamar al servicio de inscripción
      await participacionService.inscribir(eventoId, userId);
      
      // Actualizar la lista de eventos inscritos
      setEventosInscritos(prev => [...prev, eventoId]);
      
      toast.success('¡Te has inscrito exitosamente al evento!');
    } catch (err) {
      console.error('Error al inscribirse al evento:', err);
      toast.error('Algo salió mal, intenta de nuevo');
      // alert('Hubo un problema al inscribirte. Por favor, intenta de nuevo.');
    } finally {
      setInscribiendose(null);
    }
  };
  
  // Verificar si el usuario está inscrito en un evento
  const estaInscrito = (evento: Evento) => {
    return eventosInscritos.includes(evento.id);
  };
  
  // Redirigir a la página de detalles de un evento
  const handleVerDetalles = (eventoId: number) => {
    navigate(`/evento/${eventoId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado con imagen de fondo */}
        <div className="relative rounded-xl overflow-hidden mb-10 shadow-lg">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img 
              src={fondoPies}
              alt="Fondo de corredores" 
              className="w-full h-full object-cover"
            />
            {/* Overlay oscuro para mejorar contraste */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          <div className="relative px-6 py-24 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Próximos Encuentros Running</h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Descubre los próximos eventos de running disponibles. Únete a corredores de todos los niveles y disfruta de la experiencia.
            </p>
          </div>
        </div>
        
        {/* Título de la sección */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">¡Top 6 eventos que se avecinan!</h2>
          <p className="text-gray-600 mt-2">Los siguientes eventos están ordenados del más próximo al más lejano</p>
        </div>
        
        {/* Lista de eventos */}
        <EventsList
          eventos={eventosProximos}
          loading={loading}
          error={error}
          reloadData={() => cargarProximosEventos(6)}
          resetFilters={() => {}}
          inscribiendose={inscribiendose}
          onInscribirse={handleInscripcion}
          checkInscrito={estaInscrito}
          onVerDetalles={handleVerDetalles}
          columns={3}
        />
        
      </div>
    </Layout>
  );
};

export default EventsPage;