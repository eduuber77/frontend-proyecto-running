import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { authService } from '../services/apiServices';
import toast from 'react-hot-toast';

// Definición de la interfaz para los datos del formulario
interface FormData {
  nombre: string;
  apellido: string;
  sexo: string;
  email: string;
  contrasena: string;
  repetirContrasena: string;
}

const RegistroPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    apellido: Yup.string()
      .required('El apellido es obligatorio')
      .min(2, 'El apellido debe tener al menos 2 caracteres'),
    sexo: Yup.string()
      .required('Por favor selecciona una opción'),
    email: Yup.string()
      .required('El email es obligatorio')
      .email('Formato de email inválido'),
    contrasena: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    repetirContrasena: Yup.string()
      .required('Debes confirmar la contraseña')
      .oneOf([Yup.ref('contrasena')], 'Las contraseñas no coinciden')
  });
  
  // Configuración de Formik
  const formik = useFormik<FormData>({
    initialValues: {
      nombre: '',
      apellido: '',
      sexo: '',
      email: '',
      contrasena: '',
      repetirContrasena: ''
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const registerData = {
          nombre: values.nombre,
          apellidos: values.apellido,
          email: values.email,
          password: values.contrasena,
          genero: values.sexo
        };
        
        // Llamamos al servicio de registro
        await authService.register(registerData);

        // Mostramos un mensaje de éxito
        toast.success('Registro exitoso');
        
        // Redirigimos al login
        navigate('/login');
      } catch (error) {
        console.error('Error al registrar:', error);
        toast.error('Error al registrar usuario. Inténtalo de nuevo.');
      }
    }
  });

  // Función para avanzar al siguiente paso
  const handleNextStep = async () => {
    let canProceed = false;
    
    // Validación por paso
    if (currentStep === 1) {
      // Validamos solo los campos del paso 1
      const errors = await formik.validateForm();
      canProceed = !errors.nombre && !errors.apellido && !errors.sexo;
    } else if (currentStep === 2) {
      // Validamos solo el campo del paso 2
      const errors = await formik.validateForm();
      canProceed = !errors.email;
    }
    
    if (canProceed) {
      setCurrentStep(prevStep => Math.min(prevStep + 1, totalSteps));
    } else {
      // Tocamos los campos para mostrar errores
      if (currentStep === 1) {
        formik.setFieldTouched('nombre', true);
        formik.setFieldTouched('apellido', true);
        formik.setFieldTouched('sexo', true);
      } else if (currentStep === 2) {
        formik.setFieldTouched('email', true);
      }
    }
  };

  // Función para retroceder al paso anterior
  const handlePrevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  // Renderizado del contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-5">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.nombre && formik.errors.nombre ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  placeholder="Escribe tu nombre"
                />
                {formik.values.nombre && !formik.errors.nombre && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.nombre}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.apellido && formik.errors.apellido ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  placeholder="Escribe tu apellido"
                />
                {formik.values.apellido && !formik.errors.apellido && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.apellido}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <div className="relative">
                <select
                  id="sexo"
                  name="sexo"
                  value={formik.values.sexo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.sexo && formik.errors.sexo ? 'border-red-400' : 'border-gray-300'} rounded-md appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white`}
                >
                  <option value="">Selecciona tu sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {formik.values.sexo && !formik.errors.sexo && (
                  <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.sexo && formik.errors.sexo && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.sexo}
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  placeholder="ejemplo@correo.com"
                />
                {formik.values.email && !formik.errors.email && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-5">
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={formik.values.contrasena}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.contrasena && formik.errors.contrasena ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  placeholder="Mínimo 6 caracteres"
                />
                {formik.values.contrasena && !formik.errors.contrasena && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.contrasena && formik.errors.contrasena && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.contrasena}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="repetirContrasena" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="repetirContrasena"
                  name="repetirContrasena"
                  value={formik.values.repetirContrasena}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${formik.touched.repetirContrasena && formik.errors.repetirContrasena ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  placeholder="Confirma tu contraseña"
                />
                {formik.values.repetirContrasena && !formik.errors.repetirContrasena && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formik.touched.repetirContrasena && formik.errors.repetirContrasena && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.repetirContrasena}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            {/* Sección de cabecera */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Crear una cuenta</h2>
                <p className="text-gray-600 mt-1">Completa los datos para registrarte en Eventos Running</p>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
                Paso {currentStep} de {totalSteps}
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="relative mb-10">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  className="transition-all duration-500 ease-in-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                >
                </div>
              </div>
              <div className="flex justify-between">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-center rounded-full transition-all ${
                      i + 1 <= currentStep ? 'bg-orange-500 border-orange-500' : 'bg-gray-200 border-gray-300'
                    } border-2 h-8 w-8 text-xs font-medium ${
                      i + 1 <= currentStep ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {i + 1 < currentStep ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={formik.handleSubmit}>
              <div className="min-h-[300px]">
                {renderStepContent()}
              </div>
              
              {/* Botones de navegación */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Anterior
                  </button>
                ) : (
                  <div></div> // Espacio en blanco para mantener el justificado
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={`px-6 py-2 rounded-md transition-colors duration-200 flex items-center ${
                      formik.isSubmitting || !formik.isValid
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {formik.isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registrando...
                      </>
                    ) : (
                      'Completar registro'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Enlaces adicionales */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-orange-600 hover:underline">
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistroPage;
