import React from 'react';

/**
 * Componente para la sección de testimonios en la página principal
 */
const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">HISTORIAS DE CORREDORES</h3>
          <div className="h-1 w-20 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Personas como tú que transformaron sus vidas a través del running. Estas son sus historias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonio 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Ana García</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Comencé a correr hace 3 años para perder peso, pero encontré mucho más que eso: una comunidad, disciplina y la confianza para enfrentar cualquier desafío. Completé mi primera maratón el año pasado, algo que jamás pensé posible."
              </p>
            </div>
          </div>
          
          {/* Testimonio 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Javier Méndez</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "El running me salvó de una vida sedentaria. Descubrí el trail running hace 2 años y me enamoré de la conexión con la naturaleza. Los entrenamientos grupales me dieron una familia de corredores que me motivan constantemente a mejorar."
              </p>
            </div>
          </div>
          
          {/* Testimonio 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Sofía Ramírez</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A los 45 años, creí que era tarde para comenzar a correr. Después de mi primer 5K, me di cuenta de que nunca es tarde para reinventarse. Ahora, a los 48, corro 10K regularmente y he hecho amigos increíbles. El running me dio una segunda juventud."
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialsSection;