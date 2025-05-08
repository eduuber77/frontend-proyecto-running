
const MissionSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-700 to-blue-800 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Encabezado con efecto visual */}
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-64 md:h-64 rounded-full bg-blue-600 opacity-20 filter blur-xl"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">NUESTRA MISIÓN</h3>
          <div className="h-1 w-20 md:w-24 bg-yellow-400 mx-auto mb-6 md:mb-8"></div>
          
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed relative z-10 px-2">
            Inspirar y empoderar a personas de todas las edades a descubrir la libertad y plenitud 
            que aporta el running como estilo de vida transformador.
          </p>
        </div>
        
        {/* Cita destacada */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 relative px-6 md:px-0">
          <div className="hidden md:block absolute -left-2 top-0 text-5xl text-yellow-400 opacity-50">"</div>
          <div className="hidden md:block absolute -right-2 bottom-0 text-5xl text-yellow-400 opacity-50">"</div>
          <p className="text-xl md:text-2xl italic text-center text-blue-100 md:px-8">
            Creemos que cada paso que das corriendo es un paso hacia una versión mejor de ti mismo, 
            conectando cuerpo, mente y espíritu en un ritmo perfecto con el mundo que te rodea.
          </p>
        </div>
        
        {/* Sección de valores en diseño fluido */}
        <div className="relative">
          {/* Elementos decorativos */}
          <div className="absolute top-10 left-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-blue-600 opacity-10 filter blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-yellow-400 opacity-10 filter blur-xl"></div>
          
          {/* Línea de tiempo con valores - Visible solo en desktop */}
          <div className="hidden md:block relative z-10 max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 opacity-30 transform -translate-x-1/2"></div>
            
            {/* Valor 1 */}
            <div className="flex items-center mb-16 relative">
              <div className="w-1/2 pr-12 text-right mb-0">
                <h4 className="text-2xl font-bold text-yellow-400 mb-2">COMUNIDAD</h4>
                <p className="text-blue-100">
                  Construimos espacios donde los corredores de todos los niveles pueden conectar, 
                  compartir experiencias y motivarse mutuamente para alcanzar sus metas.
                </p>
              </div>
              <div className="absolute left-1/2 w-10 h-10 bg-yellow-400 rounded-full transform -translate-x-1/2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>
            
            {/* Valor 2 */}
            <div className="flex items-center mb-16 relative">
              <div className="w-1/2 pr-12"></div>
              <div className="absolute left-1/2 w-10 h-10 bg-yellow-400 rounded-full transform -translate-x-1/2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="w-1/2 pl-12 text-left mb-0">
                <h4 className="text-2xl font-bold text-yellow-400 mb-2">BIENESTAR</h4>
                <p className="text-blue-100">
                  Promovemos el running no solo como actividad física, sino como herramienta para el 
                  equilibrio mental, emocional y físico, generando hábitos saludables para toda la vida.
                </p>
              </div>
            </div>
            
            {/* Valor 3 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12 text-right mb-0">
                <h4 className="text-2xl font-bold text-yellow-400 mb-2">SUPERACIÓN</h4>
                <p className="text-blue-100">
                  Celebramos cada kilómetro recorrido como una victoria personal, inspirando a 
                  los corredores a desafiar sus límites y descubrir su verdadero potencial.
                </p>
              </div>
              <div className="absolute left-1/2 w-10 h-10 bg-yellow-400 rounded-full transform -translate-x-1/2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>
          </div>
          
          {/* Versión móvil de los valores - Visible solo en móvil */}
          <div className="md:hidden max-w-md mx-auto space-y-12">
            {/* Valor 1 - Móvil */}
            <div className="bg-blue-600 bg-opacity-20 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-yellow-400 mb-2 text-center mt-3">COMUNIDAD</h4>
              <p className="text-blue-100 text-center">
                Construimos espacios donde los corredores de todos los niveles pueden conectar, 
                compartir experiencias y motivarse mutuamente para alcanzar sus metas.
              </p>
            </div>
            
            {/* Valor 2 - Móvil */}
            <div className="bg-blue-600 bg-opacity-20 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-yellow-400 mb-2 text-center mt-3">BIENESTAR</h4>
              <p className="text-blue-100 text-center">
                Promovemos el running no solo como actividad física, sino como herramienta para el 
                equilibrio mental, emocional y físico, generando hábitos saludables para toda la vida.
              </p>
            </div>
            
            {/* Valor 3 - Móvil */}
            <div className="bg-blue-600 bg-opacity-20 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-yellow-400 mb-2 text-center mt-3">SUPERACIÓN</h4>
              <p className="text-blue-100 text-center">
                Celebramos cada kilómetro recorrido como una victoria personal, inspirando a 
                los corredores a desafiar sus límites y descubrir su verdadero potencial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;