
export const formatearFecha = (fechaString: string): string => {
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Error al formatear fecha:', e);
      return fechaString; 
    }
  };
  

  export const ordenarEventosPorFecha = <T extends { fecha: string }>(eventos: T[]): T[] => {
    return [...eventos].sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return fechaA - fechaB;
    });
  };
  

  export const esFechaFutura = (fechaString: string): boolean => {
    try {
      const fecha = new Date(fechaString);
      const hoy = new Date();
      return fecha.getTime() > hoy.getTime();
    } catch (e) {
      console.error('Error al verificar fecha:', e);
      return false;
    }
  };