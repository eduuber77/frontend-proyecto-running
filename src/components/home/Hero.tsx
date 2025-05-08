import React from 'react';

interface HeroProps {
  onJoinClick?: () => void;
}

/**
 * Componente para la sección hero de la página principal
 */
const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  return (
    <section className="bg-blue-700 text-white border-b border-blue-600 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-200 text-sm uppercase font-semibold tracking-wider mb-2 block">Bienvenido a</span>
          <h2 className="text-5xl font-bold mb-6 tracking-tight">RUNNING <span className="block text-4xl mt-1"></span></h2>
          <div className="bg-white bg-opacity-10 p-6 backdrop-filter backdrop-blur-sm rounded-lg border border-white border-opacity-20 shadow-lg mt-8">
            <p className="text-blue-900 text-lg mb-4">
              ¡Prepárate para correr y ser parte de las próximas carreras de tu ciudad!
            </p>
            <p className="text-blue-900 mb-6">
              Encuentra carreras y eventos para correr por tu ciudad completa. ¡Únete a nuestra comunidad de corredores!
            </p>
            <div className="flex justify-center mt-4">
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-md shadow-md transition-all duration-300 flex items-center font-semibold"
                onClick={onJoinClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Unirse ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;