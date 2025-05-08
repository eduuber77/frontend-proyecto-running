import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import EventsList from '../components/events/EventsList';
import { participacionService } from '../services/participacion';
import { useAuth } from '../context/authContext'; 
import { Evento } from '../types';

const UserProfilePage: React.FC = () => {
  let user = null;
  let userId = null;
  try {
    const auth = useAuth();
    user = auth.user;
    userId = user?.id || null;
  } catch (error) {
    console.error('Error al acceder al contexto de autenticación:', error);
  }

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchParticipaciones = async () => {
      try {
        setLoading(true);
        const participaciones = await participacionService.getMisParticipaciones(userId || undefined);
        const eventosInscritos = participaciones
          .map(p => p.evento)
          .filter((e): e is Evento => !!e);
        
        setEventos(eventosInscritos);
      } catch (error) {
        console.error("Error al cargar participaciones:");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipaciones();
  }, [userId]);

  // Calcular nivel del corredor basado en la cantidad de eventos inscritos
  const getRunnerLevel = () => {
    const cantidadEventos = eventos.length;
    
    if (cantidadEventos === 0) return { stars: 0, label: 'Principiante', nextLevelEvents: 1 };
    if (cantidadEventos === 1) return { stars: 1, label: 'Iniciado', nextLevelEvents: 1 };
    if (cantidadEventos === 2) return { stars: 2, label: 'Intermedio', nextLevelEvents: 1 };
    return { stars: 3, label: 'Avanzado', nextLevelEvents: 0 };
  };

  // Obtener nivel del corredor
  const runnerLevel = getRunnerLevel();

  // Manejar visualización de detalles del evento
  const handleViewDetails = (id: number) => {
    navigate(`/evento/${id}`);
  };

  // Funciones para navegar por el carrusel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= eventos.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? eventos.length - 1 : nextIndex;
    });
  };

  // Obtener eventos visibles para el carrusel
  const getVisibleEvents = () => {
    if (!eventos.length) return [];
    if (eventos.length <= 3) return eventos;

    const visibleEvents = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % eventos.length;
      visibleEvents.push(eventos[index]);
    }
    return visibleEvents;
  };

  // Renderizar componente
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        )}
        
        {!loading && (
          <>
            {/* Sección de Perfil */}
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 mb-8">
              {/* Información del Usuario */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-blue-800 mb-4">
                  Perfil
                </h1>
                
                {user && (
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Nombre</dt>
                      <dd className="text-lg text-blue-800">{user.nombre}</dd>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Apellido</dt>
                      <dd className="text-lg text-blue-800">{user.apellidos}</dd>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Email</dt>
                      <dd className="text-lg text-blue-800">{user.email}</dd>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Nivel de corredor</dt>
                      <dd className="flex items-center">
                        <span className="text-lg text-blue-800 mr-2">{runnerLevel.label}</span>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${i < runnerLevel.stars ? 'text-yellow-500' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
            
            {/* Participaciones */}
            <div className="mb-8">
              {/* Título y contador de eventos mejorado para responsividad */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="text-3xl font-bold text-black">
                  MIS PARTICIPACIONES
                </h2>
                {/* Contador de eventos - Ahora con gap en vez de margin-left */}
                {eventos.length > 0 && (
                  <span className="text-base font-medium bg-blue-600 text-white px-3 py-1 rounded-full inline-flex items-center justify-center">
                    {eventos.length} eventos
                  </span>
                )}
              </div>
              <div className="h-1 w-20 bg-yellow-400 mb-10"></div>
              
              {eventos.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-lg text-gray-600">No te has inscrito a ningún evento todavía</p>
                  <button 
                    onClick={() => navigate('/eventos')}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Ver eventos disponibles
                  </button>
                </div>
              ) : (
                <div>
                  {/* Eventos visibles */}
                  <EventsList
                    eventos={getVisibleEvents()}
                    loading={false}
                    error={null}
                    onVerDetalles={handleViewDetails}
                    columns={3}
                  />
                  
                  {/* Navegación del carrusel - Centrada */}
                  {eventos.length > 3 && (
                    <div className="flex justify-center items-center mt-8 space-x-4">
                      <button 
                        onClick={prevSlide} 
                        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Anterior"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Indicadores (paginación) */}
                      <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(eventos.length / 3) }).map((_, i) => {
                          const startIndex = i * 3;
                          const isActive = currentIndex >= startIndex && currentIndex < startIndex + 3;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentIndex(startIndex)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                isActive ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                              aria-label={`Ver página ${i + 1}`}
                            />
                          );
                        })}
                      </div>
                      
                      <button 
                        onClick={nextSlide} 
                        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Siguiente"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default UserProfilePage;