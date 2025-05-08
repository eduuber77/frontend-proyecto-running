import React from 'react';
import Layout from '../components/layout/Layout';
import sara from "../assets/sara.png";
import marta from "../assets/marta.png";
import pablo from "../assets/pablo.png";
import ruben from "../assets/ruben.png";

import equipo from "../assets/equipo.jpeg";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string; 
}

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'MARTA',
      role: 'Corredora Profesional',
      description: 'Experiencia de más de 10 años corriendo. Ganadora de x1 Maratón Championship.',
      image: marta
    },
    {
      name: 'RUBÉN',
      role: 'Fisioterapeuta',
      description: 'Fisioterapeuta apasionado y especializado en corredores de alto nivel.',
      image: ruben
    },
    {
      name: 'SARA',
      role: 'Atleta Multidisciplinar',
      description: 'Ganadora de 4 medias maratones y cinco triathlones.',
      image: sara
    },
    {
      name: 'PABLO',
      role: 'Entrenador y Nutricionista',
      description: 'Entrenador personal y nutricionista enfocado en deportistas running.',
      image: pablo
    }
  ];

  return (
    <Layout>
      {/* Header con fondo blanco */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">NUESTRO EQUIPO</h1>
          <div className="h-1 w-24 bg-yellow-400 mx-auto mb-2"></div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Conoce a los profesionales que hacen posible que alcances tus metas en el running
          </p>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Imagen principal del equipo */}
            <div className="rounded-xl shadow-md overflow-hidden relative h-auto bg-white border border-gray-200">
              <img 
                src={equipo} 
                alt="Equipo Running Elite Team" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/api/placeholder/800/600";
                }}
              />
              {/* Overlay decorativo */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900 to-transparent opacity-60"></div>
            </div>

            {/* Información del equipo - Con nuevo diseño */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-200 border border-blue-100">

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-800">Running Elite Team</h2>
                <div className="flex mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Equipo Oficial</span>
                  <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Profesionales del Running</span>
                </div>
              </div>
              
              <div className="text-gray-700 space-y-4">
                <p>
                  Nuestro equipo está formado por apasionados con amplia experiencia en competiciones 
                  nacionales e internacionales. Nos dedicamos a entrenar, asesorar y acompañar a corredores de todos 
                  los niveles, desde principiantes hasta atletas de élite.
                </p>
                <p>
                  Combinamos conocimientos en fisioterapia, nutrición y entrenamiento personalizado para ayudarte 
                  a alcanzar tus objetivos. Ya sea completar tu primera carrera de 5K o mejorar tu marca personal 
                  en maratón, contamos con la experiencia y pasión para guiarte en cada paso del camino.
                </p>
              </div>
            </div>
          </div>

          {/* Título para la sección de miembros del equipo */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900">Nuestros profesionales</h3>
          </div>
          
          {/* Miembros del equipo - Con nuevo diseño y mejor visualización de rostros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Imagen del miembro del equipo - Ajustada para mostrar mejor los rostros */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`} 
                      className="w-full object-cover"
                      style={{
                        height: '100%',
                        objectPosition: 'center 25%' // Ajustado para enfocar más la parte superior donde está el rostro
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "/api/placeholder/300/300";
                      }}
                    />
                  </div>
                  {/* Efecto de overlay al hacer hover - menos opaco para ver mejor los rostros */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-1">{member.name}</h3>
                  <div className="text-sm text-yellow-600 font-medium mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;