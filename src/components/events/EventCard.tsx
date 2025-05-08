import React from 'react';
import { formatearFecha } from '../../utils/dateUtils';
import Badge from '../common/Badge';

// Interfaces
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

interface EventCardProps extends Evento {
  onInscribirse?: (id: number) => void;
  inscribiendose?: boolean;
  inscrito?: boolean;
  onVerDetalles?: (id: number) => void;
}

/**
 * Componente para mostrar una tarjeta de evento
 */
const EventCard: React.FC<EventCardProps> = ({
  id,
  nombre,
  descripcion,
  ciudad,
  fecha,
  nivelDificultad,
  imagenUrl,
  destacado,
  onInscribirse,
  inscribiendose = false,
  inscrito = false
}) => {
  // Obtener color según nivel de dificultad
  const getNivelVariant = (nivel: string): 'success' | 'warning' | 'danger' | 'info' => {
    switch(nivel) {
      case 'PRINCIPIANTE': return 'success';
      case 'INTERMEDIO': return 'warning';
      case 'AVANZADO': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group">
      {/* Imagen del evento */}
      <div className="h-60 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center border-b border-blue-100 relative overflow-hidden transition-all duration-300">
        {imagenUrl ? (
          <img 
            src={`${import.meta.env.VITE_API_IMG}${imagenUrl}`} 
            alt={nombre} 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null; 
              e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Imagen+no+disponible';
            }}
          />
        ) : (
          <div className="absolute w-full h-full opacity-20">
            <div className="absolute transform rotate-45 bg-blue-200 h-1 w-full top-1/3 left-0"></div>
            <div className="absolute transform -rotate-45 bg-blue-200 h-1 w-full top-2/3 left-0"></div>
          </div>
        )}
        
        {/* Badge de destacado */}
        {destacado && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-white text-sm px-3 py-1 rounded-lg shadow-sm">
            Destacado
          </div>
        )}
        
        {/* Ciudad */}
        <div className="z-10 absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all duration-300">
          <span className="text-base font-medium">{ciudad}</span>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatearFecha(fecha)}
          </span>
        </div>
        
        <h3 className="font-semibold text-xl mb-3 text-blue-800 group-hover:text-blue-900">{nombre}</h3>
        
        {/* Descripción */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {descripcion || "Sin descripción disponible."}
        </p>
        
        <div className="mt-4 pt-4 border-t border-blue-50">
          <Badge 
            variant={getNivelVariant(nivelDificultad)}
            text={`Nivel: ${nivelDificultad}`}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>
        
        {/* Botón de inscripción (solo si se proporciona la función) */}
        {onInscribirse && (
          <div className="mt-4">
            {inscrito ? (
              <button
                className="w-full bg-blue-50 text-blue-700 font-medium py-3 px-4 rounded-lg border border-blue-200 flex items-center justify-center space-x-2 cursor-default"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Inscrito
              </button>
            ) : (
              <button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center"
                onClick={() => onInscribirse(id)}
                disabled={inscribiendose}
              >
                {inscribiendose ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    <span>Inscribiendo...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Inscribirse</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;