import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
  authenticationRequired?: boolean; 
}

/**
 * Componente que protege rutas según el estado de autenticación del usuario
 * - Si authenticationRequired=true: solo permite acceso a usuarios autenticados
 * - Si authenticationRequired=false: solo permite acceso a usuarios NO autenticados (útil para login/registro)
 */

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
  children,
  authenticationRequired = true // Por defecto, la ruta requiere autenticación
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);
  
  // Acceder al contexto de autenticación con manejo de errores
  let isAuthenticated = false;
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
  }
  
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const userStr = localStorage.getItem('user');
        const tokenStr = localStorage.getItem('token');
        if (userStr && tokenStr) {
          setIsLocalAuthenticated(true);
        } else {
          setIsLocalAuthenticated(false);
        }
      } catch (error) {
        setIsLocalAuthenticated(false);
      }
    }
    setIsChecking(false);
  }, [isAuthenticated]);
  
  // Si todavía estamos verificando, mostrar un indicador de carga
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  
  // Verificar si el usuario está autenticado 
  const finalAuthState = isAuthenticated || isLocalAuthenticated;

  if (authenticationRequired && !finalAuthState) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  } 
  
  if (!authenticationRequired && finalAuthState) {
    return <Navigate to="/perfil" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;