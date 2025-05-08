import React from 'react';
import Layout from '../components/layout/Layout';
import imgEstiramientos from '../assets/estiramiento.png';
import imgE2stiramientos from '../assets/estiramiento2.png';
import respiracion from "../assets/respiracion.jpg";
import comida from "../assets/saludable-comida.png";
import agua from "../assets/agua-hidratacion.jpg";
import fondoPies from "../assets/premium.jpeg";

/**
 * pagina de consejos, con datos estaticos
 */
const AdvicePage: React.FC = () => {
  return (
    <Layout>
      <div className="relative w-full h-96">
        <div className="absolute inset-0">
          <img 
            src={fondoPies} 
            alt="Corredores en acción" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center px-8 max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">RUNNING</h1>
          <div className="h-1 w-24 bg-yellow-400 mb-4"></div>
          <h2 className="text-3xl font-light text-white mb-6">COMO ESTILO DE VIDA</h2>
          <p className="text-white text-xl max-w-2xl">
            Consejos profesionales para mejorar tu técnica, rendimiento y disfrutar al máximo cada carrera.
          </p>
        </div>
      </div>

      {/* Sección de Enfoque Profesional - Card blanca sobre fondo azul */}
      <div className="bg-blue-800 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-2">ENFOQUE PROFESIONAL</h2>
            <div className="h-1 w-20 bg-yellow-400 mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-6">
                  Tanto si eres principiante como si llevas tiempo corriendo, estos consejos te ayudarán a mejorar tu rendimiento, 
                  prevenir lesiones y disfrutar más de cada kilómetro. Nuestro enfoque se basa en métodos probados científicamente
                  que maximizan los resultados mientras cuidan tu salud.
                </p>
                <p className="text-gray-700">
                  Los consejos que encontrarás aquí son una recopilación de las mejores prácticas utilizadas por atletas profesionales
                  y entrenadores especializados, adaptadas para todos los niveles.
                </p>
              </div>
              <div className="md:w-1/3">
                <img 
                  src={imgEstiramientos} 
                  alt="Enfoque profesional"
                  className="w-full h-64 object-cover rounded" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Tarjetas de áreas clave - 4 tarjetas en fila */}
<div className="py-16 bg-gray-100">
  <div className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-3xl font-bold mb-2">ÁREAS CLAVE</h2>
    <div className="h-1 w-20 bg-yellow-400 mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Tarjeta 1 - Calentamiento */}
      <div className="bg-white border-t-4 border-blue-600 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Calentamiento Efectivo</h3>
          <p className="text-gray-600">Prepara tu cuerpo para el máximo rendimiento y minimiza el riesgo de lesiones con una rutina completa.</p>
        </div>
      </div>
      
      {/* Tarjeta 2 - Respiración */}
      <div className="bg-white border-t-4 border-blue-500 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M12 18v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M4.93 16.07L3.5 17.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M20.5 17.5l-1.43-1.43" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M16.07 4.93L17.5 3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M3.5 6.5l1.43 1.43" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M6 12H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path d="M20 12h-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Técnica de Respiración</h3>
          <p className="text-gray-600">Aumenta tu capacidad pulmonar y mejora tu resistencia con patrones de respiración optimizados para corredores.</p>
        </div>
      </div>
      
      {/* Tarjeta 3 - Nutrición */}
      <div className="bg-white border-t-4 border-blue-400 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 64 64">
  <path d="M32 12c-11.046 0-20 4.477-20 10h40c0-5.523-8.954-10-20-10zm0 4c8.837 0 16 2.239 16 6H16c0-3.761 7.163-6 16-6zM12 26h40v4H12zm0 8h40v4H12zm0 8h40v4H12z"/>
</svg>




          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Nutrición Óptima</h3>
          <p className="text-gray-600">Alimenta tu cuerpo con los nutrientes adecuados antes, durante y después del entrenamiento para un mejor rendimiento.</p>
        </div>
      </div>
      
      {/* Tarjeta 4 - Estiramientos */}
      <div className="bg-white border-t-4 border-blue-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Rutinas de Estiramiento</h3>
          <p className="text-gray-600">Maximiza tu flexibilidad y recuperación con estiramientos específicos que previenen lesiones y mejoran tu rendimiento.</p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Sección de imagen a ancho completo con texto */}
      <div className="relative w-full h-96">
        <div className="absolute inset-0">
          <img 
            src={respiracion} 
            alt="Entrenamiento" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">El entrenamiento tiene lugar en rutas especialmente seleccionadas</h2>
          <p className="text-white text-xl max-w-3xl">
            Contamos con rutas para todos los niveles, desde principiantes hasta corredores avanzados,
            y ofrecemos tanto entrenamientos individuales como grupales.
          </p>
        </div>
      </div>

{/* Sección ENTRENAMIENTO */}
<div className="py-16 bg-white">
  <div className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-3xl font-bold mb-2">CONSEJOS PARA CORREDORES</h2>
    <div className="h-1 w-20 bg-yellow-400 mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Tarjeta de Hidratación */}
      <div className="border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">HIDRATACIÓN</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Mantente hidratado antes, durante y después de correr</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>El agua es vital para un rendimiento óptimo</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Escucha a tu cuerpo y bebe cuando tengas sed</span>
            </li>
          </ul>
        </div>
        <img
          src={agua}
          alt="Hidratación para corredores"
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Tarjeta de Nutrición */}
      <div className="border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">ALIMENTACIÓN</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Consume carbohidratos complejos 3 horas antes de correr</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Incluye proteínas magras para recuperación muscular</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Prioriza frutas y verduras ricas en antioxidantes</span>
            </li>
          </ul>
        </div>
        <img
          src={comida}
          alt="Alimentación saludable"
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Tarjeta de Estiramientos */}
      <div className="border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">ESTIRAMIENTOS</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Estira 10 minutos antes y después de correr</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Enfócate en cuádriceps, isquiotibiales y pantorrillas</span>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 mt-2"></div>
              <span>Incorpora rodillo de espuma para liberar tensión</span>
            </li>
          </ul>
        </div>
        <img
          src={imgE2stiramientos}
          alt="Estiramientos correctos"
          className="w-full h-48 object-cover"
        />
      </div>
    </div>
  </div>
</div>

      {/* Sección de consejos detallados */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-2">CONSEJOS DETALLADOS</h2>
          <div className="h-1 w-20 bg-yellow-400 mb-12"></div>
          
          {/* Calentamiento */}
          <div className="mb-12 bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Calentamiento eficaz</h3>
            <p className="mb-6">
              Calentar adecuadamente es crucial para preparar tu cuerpo para el esfuerzo físico, mejorar tu rendimiento 
              y reducir el riesgo de lesiones. Un buen calentamiento aumenta la temperatura corporal, mejora la 
              circulación sanguínea y prepara tus músculos y articulaciones para la actividad.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Rutina de calentamiento recomendada:</h4>
              <ul className="list-disc pl-6 mb-3 space-y-2">
                <li>Camina a paso ligero durante 3-5 minutos para elevar gradualmente tu ritmo cardíaco.</li>
                <li>Realiza movilidad articular: rotación de tobillos, rodillas, caderas y hombros.</li>
                <li>Incluye ejercicios dinámicos como talones al glúteo, skipping y zancadas.</li>
                <li>Termina con 2-3 minutos de carrera suave progresiva.</li>
                <li>Para entrenamientos intensos, añade 4-6 aceleraciones cortas.</li>
              </ul>
            </div>
          </div>
          
          {/* Respiración */}
          <div className="mb-12 bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Capacidad pulmonar</h3>
            <p className="mb-6">
              Una mayor capacidad pulmonar significa que puedes absorber más oxígeno y distribuirlo eficientemente a tus 
              músculos, lo que mejora tu resistencia y rendimiento durante la carrera. Aunque parte de la capacidad pulmonar 
              está determinada genéticamente, existen estrategias efectivas para maximizar tu potencial.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Ejercicios específicos para mejorar la capacidad pulmonar:</h4>
              <ul className="list-disc pl-6 mb-3 space-y-2">
                <li><strong>Respiración diafragmática:</strong> Acostado, coloca una mano en el pecho y otra en el abdomen. 
                  Inspira lentamente por la nariz expandiendo el abdomen (no el pecho). Exhala lentamente por la boca. 
                  Realiza 5-10 minutos diarios.</li>
                <li><strong>Entrenamiento a intervalos (HIIT):</strong> Alterna periodos cortos 
                  de alta intensidad con recuperación activa. Por ejemplo: 30 segundos a 
                  máxima intensidad seguidos de 1-2 minutos de recuperación, repetido 6-8 veces.</li>
                <li><strong>Natación:</strong> Es excelente para desarrollar la capacidad pulmonar y la técnica 
                  de respiración controlada. Incluye sesiones de 20-30 minutos 1-2 veces por semana.</li>
              </ul>
            </div>
          </div>
          
          {/* Alimentación */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Alimentación saludable</h3>
            <p className="mb-6">
              La nutrición adecuada es tan importante como el entrenamiento para optimizar tu rendimiento como corredor. 
              Una alimentación equilibrada proporciona la energía necesaria para entrenar, acelera la recuperación 
              y fortalece tu sistema inmunológico.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Recomendaciones nutricionales para corredores:</h4>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Carbohidratos:</strong> Son tu principal fuente de energía. Deberían representar el 50-60% 
                  de tu ingesta calórica diaria, priorizando fuentes complejas como granos enteros, legumbres, 
                  frutas y verduras.</li>
                <li><strong>Proteínas:</strong> Esenciales para la reparación y construcción muscular. Consume 1.2-1.6g por kg 
                  de peso corporal al día, de fuentes como carnes magras, pescado, huevos, lácteos y legumbres.</li>
                <li><strong>Grasas saludables:</strong> Importantes para la absorción de vitaminas y la salud hormonal. 
                  Incluye aguacates, frutos secos, aceite de oliva y pescado graso en tu dieta.</li>
                <li><strong>Hidratación:</strong> Bebe 2-3 litros de agua diariamente. Durante entrenamientos de más de 
                  60 minutos, considera bebidas isotónicas para reponer electrolitos.</li>
              </ul>
              
              <h4 className="font-semibold mb-4">Timing nutricional:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Pre-entrenamiento (1-3 horas antes):</strong> Comida rica en carbohidratos, 
                  moderada en proteínas y baja en grasas (ej. avena con plátano y un yogur).</li>
                <li><strong>Durante entrenamientos largos (60-90 min):</strong> 30-60g de carbohidratos por hora 
                  (geles, barritas o bebidas isotónicas).</li>
                <li><strong>Post-entrenamiento (30-60 min después):</strong> Combina carbohidratos y proteínas en 
                  proporción 3:1 para optimizar la recuperación (ej. batido de proteínas con plátano).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default AdvicePage;