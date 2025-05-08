import React from 'react';
import { BadgeProps } from '../../types';

/**
 * Componente de badge para mostrar indicadores
 */
const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  text,
  icon,
  className = '',
}) => {
  // Clases base para todos los badges
  const baseClasses = 'text-sm px-3 py-1.5 rounded-md border flex items-center';
  
  // Clases específicas por variante
  const variantClasses = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  
  // Combinamos todas las clases
  const badgeClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${className}
  `;
  
  return (
    <span className={badgeClasses}>
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;