// Interfaz para eventos
export interface Evento {
    id: number;
    nombre: string;
    descripcion: string;
    ciudad: string;
    fecha: string;
    nivelDificultad: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
    imagenUrl: string;
    destacado: boolean;
    createdAt: string;
    updatedAt: string;
    participantes?: any[]; 
    
  }
  
  // Opciones de filtrado para eventos
  export interface FilterOptions {
    nivelesDificultad: string[];
    ciudades: string[];
  }
  
  // Props para componentes comunes
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }
  
  export interface BadgeProps {
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    text: string;
    icon?: React.ReactNode;
    className?: string;
  }
  
  // Props para componentes de eventos
  export interface EventCardProps extends Evento {
    onInscribirse?: (id: number) => void;
    inscribiendose?: boolean;
    inscrito?: boolean;
  }

  export interface EventsListProps {
    eventos: Evento[];
    loading: boolean;
    error: string | null;
    onVerDetalles: (id: number) => void;
    columns?: number;
    // showCancelButton?: boolean;
    onCancelInscripcion?: (eventoId: number) => Promise<void>;
  }
  
  export interface EventsFilterProps {
    filterOptions: FilterOptions;
    searchTerm: string;
    selectedCity: string;
    selectedLevel: string;
    sortOrder: 'asc' | 'desc';
    loading: boolean;
    onSearchChange: (term: string) => void;
    onCityChange: (city: string) => void;
    onLevelChange: (level: string) => void;
    onSortChange: () => void;
    onResetFilters: () => void;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  // Props para estados específicos
  export interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
  }
  
  export interface EmptyStateProps {
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
  }
  
  export interface ErrorStateProps {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
  }