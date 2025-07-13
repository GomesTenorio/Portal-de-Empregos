export interface Habilidade {
  id?: number;
  nome: string;
  categoria?: string;
  descricao?: string;
}

export interface CandidatoHabilidade {
  candidatoId: number;
  habilidadeId: number;
  nivelProficiencia?: NivelProficiencia;
  anosExperiencia?: number;
  certificado?: boolean;
  observacoes?: string;
}

export enum NivelProficiencia {
  BASICO = 'Básico',
  INTERMEDIARIO = 'Intermediário',
  AVANCADO = 'Avançado',
  ESPECIALISTA = 'Especialista'
}

export interface CandidatoHabilidadeCreateRequest {
  nivelProficiencia?: NivelProficiencia;
  anosExperiencia?: number;
  certificado?: boolean;
  observacoes?: string;
}

