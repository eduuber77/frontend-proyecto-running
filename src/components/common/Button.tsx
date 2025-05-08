import React from 'react';
import { ButtonProps } from '../../types';

/**
 * Componente de botón reutilizable con múltiples variantes
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
  children,
}) => {
  // Clases base para todos los botones
  const baseClasses = 'font-medium rounded transition-all duration-300 flex items-center justify-center';
  
  // Clases específicas por variante
  const variantClasses = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm',
    secondary: 'bg-yellow-400 hover:bg-yellow-500 text-blue-900 shadow-sm',
    outline: 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-300',
    text: 'bg-transparent hover:bg-blue-50 text-blue-700',
  };
  
  // Clases específicas por tamaño
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-base',
  };
  
  // Clases para estado deshabilitado
  const disabledClasses = disabled 
    ? 'opacity-60 cursor-not-allowed' 
    : 'hover:shadow-lg hover:translate-y-[-2px]';
  
  // Combinamos todas las clases
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${disabledClasses} 
    ${className}
  `;
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;