// Export all models
export * from './usuario.model';
export * from './candidato.model';
export * from './empresa.model';
export * from './vaga.model';
export * from './candidatura.model';
export * from './experiencia-profissional.model';
export * from './formacao-academica.model';
export * from './habilidade.model';

// Common interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
  status: number;
}

