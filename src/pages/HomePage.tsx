import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import MissionSection from '../components/home/MissionSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import EventsList from '../components/events/EventsList';
import EventsFilter from '../components/events/EventsFilter';
import Pagination from '../components/events/Pagination';
import useEventos from '../hooks/useEventos';
import usePagination from '../hooks/usePagination';

/**
 * Página principal de la aplicación
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    eventos,
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
    recargarDatos
  } = useEventos();

  // Configuración de paginación
  const eventsPerPage = 6;
  const { 
    currentPage, 
    currentItems: currentEvents, 
    setCurrentPage, 
    totalPages 
  } = usePagination(eventos, eventsPerPage);


  // Manejar unión a la plataforma
  const handleJoinNow = () => {
    navigate('/register');
  };

  return (
    <Layout>
      {/* Sección de Hero */}
      <Hero onJoinClick={handleJoinNow} />

      {/* Sección de Eventos Recientes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-black text-center mb-3">
            ÚLTIMOS EVENTOS
          </h3>
          <div className="h-1 w-20 bg-yellow-400 mx-auto mb-10"></div>
          <p className="text-black text-center mb-10 max-w-2xl mx-auto">
            Descubre los próximos eventos de running disponibles. Filtra por ciudad, nivel o categoría para encontrar el evento perfecto para ti.
          </p>
          
          {/* Filtros */}
          <EventsFilter
            filterOptions={filterOptions}
            searchTerm={searchTerm}
            selectedCity={selectedCity}
            selectedLevel={selectedLevel}
            sortOrder={sortOrder}
            loading={loading}
            onSearchChange={setSearchTerm}
            onCityChange={setSelectedCity}
            onLevelChange={setSelectedLevel}
            onSortChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            onResetFilters={resetFilters}
          />

          {/* Lista de eventos */}
          <EventsList
            eventos={currentEvents}
            loading={loading}
            error={error}
            reloadData={recargarDatos}
            resetFilters={resetFilters}
            columns={3}
          />

          {/* Paginación */}
          {!loading && !error && eventos.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
          
        </div>
      </section>

      {/* Sección de Misión */}
      <MissionSection />

      {/* Sección de Testimonios */}
      <TestimonialsSection />
    </Layout>
  );
};

export default HomePage;