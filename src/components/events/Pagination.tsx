import React from 'react';

// Interface para props
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Componente de paginación reutilizable
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <nav className="flex items-center space-x-2">
        {/* Botón anterior */}
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center border ${
            currentPage === 1 
              ? 'bg-blue-50 text-blue-300 border-blue-100 cursor-not-allowed' 
              : 'border-blue-300 bg-white hover:bg-blue-50 text-blue-700 transition-colors duration-200'
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Números de página */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === i + 1
                ? 'bg-blue-700 text-white'
                : 'border border-blue-300 bg-white hover:bg-blue-50 transition-colors duration-200 text-blue-700'
            }`}
            onClick={() => onPageChange(i + 1)}
            aria-label={`Página ${i + 1}`}
            aria-current={currentPage === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
        
        {/* Botón siguiente */}
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center border ${
            currentPage === totalPages 
              ? 'bg-blue-50 text-blue-300 border-blue-100 cursor-not-allowed' 
              : 'border-blue-300 bg-white hover:bg-blue-50 text-blue-700 transition-colors duration-200'
          }`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;