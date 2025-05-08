import React from 'react';
import EventCard from './EventCard';
import Loading from '../common/Loading';

// Interface para los eventos
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

interface EventsListProps {
  eventos: Evento[];
  loading: boolean;
  error: string | null;
  reloadData?: () => void;
  resetFilters?: () => void;
  inscribiendose?: number | null;
  onInscribirse?: (id: number) => void;
  checkInscrito?: (evento: Evento) => boolean;
  onVerDetalles?: (id: number) => void;
  columns?: 1 | 2 | 3;
}

/**
 * Componente para mostrar una lista de eventos
 */
const EventsList: React.FC<EventsListProps> = ({
  eventos,
  loading,
  error,
  reloadData,
  resetFilters,
  inscribiendose,
  onInscribirse,
  checkInscrito,
  onVerDetalles,
  columns = 3
}) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="md" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-6 rounded-lg shadow text-center">
        <p className="text-lg font-medium mb-2">Ocurrió un error</p>
        <p>{error}</p>
        {reloadData && (
          <button
            onClick={reloadData}
            className="mt-4 bg-white border border-red-300 hover:bg-red-50 text-red-600 font-medium py-2 px-4 rounded text-sm"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }
  
  if (eventos.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md border border-blue-100 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-blue-700 text-lg mb-2">No se encontraron eventos</p>
        <p className="text-gray-600">No se encontraron eventos que coincidan con tu búsqueda. Intenta con otros términos.</p>
        {resetFilters && (
          <button
            onClick={resetFilters}
            className="mt-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded text-sm"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div className={`grid ${gridColsClass} gap-8`}>
      {eventos.map((evento) => (
        <EventCard 
          key={evento.id} 
          {...evento} 
          inscribiendose={inscribiendose === evento.id}
          inscrito={checkInscrito ? checkInscrito(evento) : false}
          onInscribirse={onInscribirse}
          onVerDetalles={onVerDetalles}
        />
      ))}
    </div>
  );
};

export default EventsList;