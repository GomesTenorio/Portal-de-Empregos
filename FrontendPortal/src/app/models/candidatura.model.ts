import { Candidato } from './candidato.model';
import { Vaga } from './vaga.model';

export interface Candidatura {
  id?: number;
  candidato: Candidato;
  vaga: Vaga;
  dataAplicacao?: Date;
  status: StatusCandidatura;
  observacoes?: string;
}

export enum StatusCandidatura {
  CANDIDATURA_ENVIADA = 'Candidatura Enviada',
  EM_ANALISE = 'Em Análise',
  ENTREVISTA_AGENDADA = 'Entrevista Agendada',
  ENTREVISTA_REALIZADA = 'Entrevista Realizada',
  TESTE_APLICADO = 'Teste Aplicado',
  OFERECIDO = 'Oferecido',
  CONTRATADO = 'Contratado',
  REJEITADO = 'Rejeitado',
  RETIRADO = 'Retirado'
}

export interface CandidaturaCreateRequest {
  observacoes?: string;
}

export interface CandidaturaUpdateRequest {
  status: StatusCandidatura;
  observacoes?: string;
}

