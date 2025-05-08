import React from 'react';

// Interfaces para props
interface FilterOptions {
  nivelesDificultad: string[];
  ciudades: string[];
}

interface EventsFilterProps {
  filterOptions: FilterOptions;
  searchTerm: string;
  selectedCity: string;
  selectedLevel: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  onSearchChange: (term: string) => void;
  onCityChange: (city: string) => void;
  onLevelChange: (level: string) => void;
  onSortChange: () => void;
  onResetFilters: () => void;
}

/**
 * Componente para filtrar eventos
 */
const EventsFilter: React.FC<EventsFilterProps> = ({
  filterOptions,
  searchTerm,
  selectedCity,
  selectedLevel,
  sortOrder,
  loading,
  onSearchChange,
  onCityChange,
  onLevelChange,
  onSortChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-100 mb-8">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {/* Filtro de ciudad */}
          <div className="relative">
            <select
              className="border border-blue-200 bg-white hover:bg-blue-50 py-2 px-4 pr-8 text-sm rounded-md appearance-none text-blue-700"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              disabled={loading}
            >
              <option value="">Todas las ciudades</option>
              {filterOptions.ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>{ciudad}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          {/* Filtro de nivel */}
          <div className="relative">
            <select
              className="border border-blue-200 bg-white hover:bg-blue-50 py-2 px-4 pr-8 text-sm rounded-md appearance-none text-blue-700"
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              disabled={loading}
            >
              <option value="">Todos los niveles</option>
              {filterOptions.nivelesDificultad.map((nivel, index) => (
                <option key={index} value={nivel}>{nivel}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          {/* Orden */}
          <button 
            className="border border-blue-200 bg-white hover:bg-blue-50 py-2 px-4 text-sm rounded-md flex items-center transition-colors duration-200 text-blue-700"
            onClick={onSortChange}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
          
          {/* Botón de reset */}
          <button 
            className="border border-blue-200 bg-white hover:bg-blue-50 py-2 px-4 text-sm rounded-md flex items-center transition-colors duration-200 text-blue-700"
            onClick={onResetFilters}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Resetear filtros
          </button>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="w-full sm:w-64 border border-blue-200 py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsFilter;