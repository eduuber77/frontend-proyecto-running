import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logorun from '../../assets/logorun.png';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estado de autenticación 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      const tokenStr = localStorage.getItem('token');
      
      if (userStr && tokenStr) {
        const userData = JSON.parse(userStr);
        setIsAuthenticated(true);
        setUserName(userData.nombre || "");
        // Obtener la inicial del nombre para el avatar
        setUserInitial(userData.nombre ? userData.nombre.charAt(0).toUpperCase() : "U");
      } else {
        setIsAuthenticated(false);
        setUserName("");
        setUserInitial("");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserName("");
      setUserInitial("");
    }
  }, [location.pathname]); 
  
  // Función para determinar si un link está activo
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Toggle para el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Actualizar estado local
    setIsAuthenticated(false);
    setUserName("");
    setUserInitial("");
    
    // Redireccionar a la página principal
    navigate("/home");
  };
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Barra superior con logo, título y opciones de autenticación */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="h-12 flex items-center justify-center">
              <img src={logorun} alt="Eventos Running Logo" className="h-12 object-contain" />
            </div>
            <h1 className="ml-3 text-xl md:text-2xl font-medium text-gray-800 hidden sm:block">Eventos Running</h1>
          </Link>
          
          {/* Información de usuario o botones de acción - Visible solo en desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                {/* Avatar con inicial del usuario */}
                <div className="flex items-center group relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium mr-2">
                    {userInitial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{userName}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-xs text-red-600 hover:text-red-800 transition-colors text-left"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-1.5 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Iniciar sesión
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Registro
                </Link>
              </div>
            )}
          </div>
          
          {/* Botón de menú móvil */}
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Barra de navegación principal - Desktop */}
      <nav className="bg-white border-b border-gray-200 shadow-md hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center text-sm">
            <div className="flex">
              {/* HOME */}
              <li className="group relative">
                <Link 
                  to="/home" 
                  className={`flex items-center py-3 px-4 transition-colors duration-200 ${isActive('/home') ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  HOME
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/home') ? 'bg-yellow-500 scale-x-100' : 'bg-yellow-400'}`}></div>
                </Link>
              </li>
              
              {/* EVENTOS */}
              <li className="group relative">
                <Link 
                  to="/eventos" 
                  className={`flex items-center py-3 px-4 transition-colors duration-200 ${isActive('/eventos') ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  EVENTOS
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/eventos') ? 'bg-yellow-500 scale-x-100' : 'bg-yellow-400'}`}></div>
                </Link>
              </li>
              
              {/* MI PERFIL - Solo mostrar si está autenticado */}
              {isAuthenticated && (
                <li className="group relative">
                  <Link 
                    to="/perfil" 
                    className={`flex items-center py-3 px-4 transition-colors duration-200 ${isActive('/perfil') ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    MI PERFIL
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/perfil') ? 'bg-yellow-500 scale-x-100' : 'bg-yellow-400'}`}></div>
                  </Link>
                </li>
              )}
              
              {/* EQUIPO */}
              <li className="group relative">
                <Link 
                  to="/equipo" 
                  className={`flex items-center py-3 px-4 transition-colors duration-200 ${isActive('/equipo') ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  EQUIPO
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/equipo') ? 'bg-yellow-500 scale-x-100' : 'bg-yellow-400'}`}></div>
                </Link>
              </li>
              
              {/* CONSEJOS */}
              <li className="group relative">
                <Link 
                  to="/consejos" 
                  className={`flex items-center py-3 px-4 transition-colors duration-200 ${isActive('/consejos') ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  CONSEJOS
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/consejos') ? 'bg-yellow-500 scale-x-100' : 'bg-yellow-400'}`}></div>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      
      {/* Menú móvil - Solo visible cuando isMenuOpen es true */}
      <div className={`md:hidden bg-white shadow-lg border-b border-gray-200 transition-all duration-300 ${isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-2">
          {/* Información del usuario - Mostrar al principio del menú móvil cuando está autenticado */}
          {isAuthenticated && (
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                  {userInitial}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Usuario conectado</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="px-3 py-1 bg-white border border-red-500 rounded-md text-red-600 text-xs hover:bg-red-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
          
          <ul className="flex flex-col space-y-1">
            <li>
              <Link 
                to="/home" 
                className={`flex items-center py-3 px-4 rounded-md ${isActive('/home') ? 'text-white bg-yellow-500' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                HOME
              </Link>
            </li>
            
            <li>
              <Link 
                to="/eventos" 
                className={`flex items-center py-3 px-4 rounded-md ${isActive('/eventos') ? 'text-white bg-yellow-500' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                EVENTOS
              </Link>
            </li>
            
            {/* perfil - Solo mostrar si está autenticado */}
            {isAuthenticated && (
              <li>
                <Link 
                  to="/perfil" 
                  className={`flex items-center py-3 px-4 rounded-md ${isActive('/perfil') ? 'text-white bg-yellow-500' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  MI PERFIL
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                to="/equipo" 
                className={`flex items-center py-3 px-4 rounded-md ${isActive('/equipo') ? 'text-white bg-yellow-500' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                EQUIPO
              </Link>
            </li>
            
            <li>
              <Link 
                to="/consejos" 
                className={`flex items-center py-3 px-4 rounded-md ${isActive('/consejos') ? 'text-white bg-yellow-500' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                CONSEJOS
              </Link>
            </li>
            
            {/* Botones de autenticación para móvil - Solo mostrar si NO está autenticado */}
            {!isAuthenticated && (
              <>
                <li className="mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center py-2.5 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    INICIAR SESIÓN
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="flex items-center justify-center py-2.5 px-4 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    REGISTRO
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;