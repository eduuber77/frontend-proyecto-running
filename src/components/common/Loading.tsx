import React from 'react';
import { LoadingProps } from '../../types';

/**
 * Componente de loading spinner reutilizable
 */
const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'blue-700',
  className = '',
}) => {
  // Clases por tamaño
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-16 w-16 border-3',
  };
  
  // Combinar clases
  const spinnerClasses = `
    animate-spin rounded-full border-t-transparent border-${color} 
    ${sizeClasses[size]} 
    ${className}
  `;
  
  return (
    <div className="flex justify-center items-center">
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default Loading;