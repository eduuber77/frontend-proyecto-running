import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import EventsPage from '../pages/EventsPage';
import TeamPage from '../pages/TeamPage';
import AdvicePage from '../pages/AdvicePage';
import UserProfilePage from '../pages/UserProfilePage';
import ProtectedRoute from '../components/auth/protecteRouter';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas - Cualquier usuario puede acceder */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/eventos" element={<EventsPage />} />
      <Route path="/equipo" element={<TeamPage />} />
      <Route path="/consejos" element={<AdvicePage />} />
      
      {/* Rutas exclusivas para usuarios NO autenticados */}
      <Route 
        path="/login" 
        element={
          <ProtectedRoute authenticationRequired={false} redirectPath="/perfil">
            <LoginPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <ProtectedRoute authenticationRequired={false} redirectPath="/perfil">
            <RegisterPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas protegidas - Solo usuarios autenticados */}
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta de fallback - Redirecciona a home si no se encuentra la página */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;