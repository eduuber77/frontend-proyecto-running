import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
  
  // Hooks de React Router
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener información de redirección
  const from = location.state?.from?.pathname || '/perfil';
  
  // Acceder al contexto de autenticación con manejo de errores
  let auth: any = {};
  
  try {
    auth = useAuth();
  } catch (e) {
    console.error("Error al usar el contexto de autenticación:", e);
  }
  
  const { isAuthenticated, login, error } = auth;
  
  // Si el usuario ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  // Validación de campos
  const validateEmail = (email: string) => {
    if (!email) return 'El correo es obligatorio';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Formato de correo inválido';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  };

  const emailError = touchedFields.email ? validateEmail(email) : '';
  const passwordError = touchedFields.password ? validatePassword(password) : '';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados para mostrar errores
    setTouchedFields({ email: true, password: true });

    // Validación antes de enviar
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    if (emailValidation || passwordValidation) {
      setFormError('Por favor corrige los errores en el formulario');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError('');
      
      // Llamar al método de login del contexto
      if (login) {
        await login(email, password);
      } else {
        // Si no hay método login disponible, mostrar error
        throw new Error('Método de login no disponible');
      }
            
      // La redirección se maneja en el useEffect cuando isAuthenticated cambia
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setFormError('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouchedFields({
      ...touchedFields,
      [field]: true
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Mensaje de redireccionamiento */}
        {from !== '/perfil' && (
          <div className="mb-10">
            <div className="w-full p-5 border-l-4 border-blue-500 rounded-lg bg-gradient-to-r from-blue-50 to-white shadow-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-700 font-medium">
                  Debes iniciar sesión para acceder a la página solicitada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Texto informativo - No es un input */}
        <div className="mb-10">
          <div className="w-full p-5 border-l-4 border-gray-500 rounded-lg bg-gradient-to-r from-gray-100 to-white shadow-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 font-medium">
                Introduce tus datos para iniciar sesión
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de error general */}
        {(formError || error) && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="w-full p-4 border-l-4 border-red-500 rounded-lg bg-red-50">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-700 font-medium">
                  {formError || error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Bienvenido</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo 
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Introduce tu correo" 
                  className={`w-full py-3 pl-10 pr-4 border ${emailError ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  required
                />
              </div>
              {emailError && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {emailError}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  placeholder="Introduce tu contraseña" 
                  className={`w-full py-3 pl-10 pr-4 border ${passwordError ? 'border-red-400' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  required
                />
              </div>
              {passwordError && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {passwordError}
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white py-3 px-4 rounded-md transition-all duration-300 shadow-md font-medium flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : 'Iniciar Sesión'}
            </button>
          </form>
          
          {/* Link to Register Page */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta? 
              <Link to="/register" className="ml-1 text-blue-600 hover:text-blue-800">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;