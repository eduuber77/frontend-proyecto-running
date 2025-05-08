import { useState, useMemo, useEffect } from 'react';

/**
 * Hook personalizado para paginación
 * @param items - Elementos a paginar
 * @param itemsPerPage - Elementos por página
 * @param initialPage - Página inicial (default: 1)
 * @returns Estado y funciones de paginación
 */
function usePagination<T>(items: T[], itemsPerPage: number, initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Calcular total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);
  
  // Obtener elementos actuales según la página
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);
  
  useEffect(() => {
    if (currentPage > 1 && currentItems.length === 0 && items.length > 0) {
      setCurrentPage(1);
    }
  }, [items.length, currentItems.length, currentPage]);
  
  // Ir a la siguiente página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  // Ir a una página específica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

export default usePagination;