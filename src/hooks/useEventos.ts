import { useState, useEffect, useCallback } from 'react';
import { eventoService } from '../services/apiServices';
import { ordenarEventosPorFecha } from '../utils/dateUtils';

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

interface FilterOptions {
  nivelesDificultad: string[];
  ciudades: string[];
}

const useEventos = () => {
  // Estados
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosOriginales, setEventosOriginales] = useState<Evento[]>([]);
  const [eventosProximos, setEventosProximos] = useState<Evento[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ nivelesDificultad: [], ciudades: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  const filtrarLocalmente = useCallback(() => {
    try {
      let eventosFiltrados = [...eventosOriginales];
      
      if (searchTerm) {
        eventosFiltrados = eventosFiltrados.filter(evento => 
          evento.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCity) {
        eventosFiltrados = eventosFiltrados.filter(evento => 
          evento.ciudad === selectedCity
        );
      }
      
      if (selectedLevel) {
        eventosFiltrados = eventosFiltrados.filter(evento => 
          evento.nivelDificultad === selectedLevel
        );
      }
      
      // Ordenar por nombre
      eventosFiltrados.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
      
      setEventos(eventosFiltrados);
      setError(null);
    } catch (err) {
      setError('Error al filtrar eventos. Por favor, intenta de nuevo.');
    }
  }, [eventosOriginales, searchTerm, selectedCity, selectedLevel, sortOrder]);


  const cargarProximosEventos = useCallback(async (cantidad: number = 6) => {
    try {
      setLoading(true);
      setError(null);
      
      const eventosData = await eventoService.getProximos(cantidad);
      setEventosProximos(eventosData);
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los próximos eventos. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  }, []);

  // Cargar datos iniciales
  const cargarDatosIniciales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener eventos
      const eventosData = await eventoService.getAll();
      
      if (!eventosData || !Array.isArray(eventosData)) {
        throw new Error('Los datos de eventos no son válidos');
      }
      
      // Ordenar por fecha (opcional)
      const eventosOrdenados = ordenarEventosPorFecha(eventosData);
      
      setEventos(eventosOrdenados);
      setEventosOriginales(eventosOrdenados);
      
      // Obtener opciones de filtro
      try {
        const opcionesFiltro = await eventoService.getFilterOptions();
        setFilterOptions(opcionesFiltro);
      } catch (opcionesErr) {
        const ciudades = [...new Set(eventosData.map(e => e.ciudad))];
        const niveles = [...new Set(eventosData.map(e => e.nivelDificultad))];
        setFilterOptions({
          ciudades,
          nivelesDificultad: niveles
        });
      }
      
      // También cargar los próximos eventos
      await cargarProximosEventos();
      
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar datos iniciales:', err);
      setError('Error al cargar los eventos. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  }, [cargarProximosEventos]);

  // Recargar datos
  const recargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventosData = await eventoService.getAll();
      setEventos(eventosData);
      setEventosOriginales(eventosData);
      
      // También actualizar los próximos eventos
      await cargarProximosEventos();
      
      setLoading(false);
    } catch (err) {
      console.error('Error al recargar datos:', err);
      setError('Error al cargar los eventos. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  }, [cargarProximosEventos]);

  // Resetear filtros
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedLevel('');
    setSortOrder('asc');
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatosIniciales();
  }, [cargarDatosIniciales]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    if (eventosOriginales.length > 0) {
      setLoading(true);
      
      const timeoutId = setTimeout(() => {
        filtrarLocalmente();
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [eventosOriginales, filtrarLocalmente, searchTerm, selectedCity, selectedLevel, sortOrder]);

  return {
    eventos,
    eventosOriginales,
    eventosProximos,
    filterOptions,
    loading,
    error,
    searchTerm,
    selectedCity,
    selectedLevel,
    sortOrder,
    setSearchTerm,
    setSelectedCity,
    setSelectedLevel,
    setSortOrder,
    resetFilters,
    recargarDatos,
    cargarProximosEventos
  };
};

export default useEventos;