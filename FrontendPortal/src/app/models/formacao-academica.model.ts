import { Candidato } from './candidato.model';

export interface FormacaoAcademica {
  id?: number;
  candidato?: Candidato;
  instituicao: string;
  curso: string;
  nivel: NivelFormacao;
  dataInicio: Date;
  dataConclusao?: Date;
  cursandoAtualmente?: boolean;
}

export enum NivelFormacao {
  ENSINO_FUNDAMENTAL = 'Ensino Fundamental',
  ENSINO_MEDIO = 'Ensino Médio',
  TECNICO = 'Técnico',
  GRADUACAO = 'Graduação',
  POS_GRADUACAO = 'Pós-graduação',
  MESTRADO = 'Mestrado',
  DOUTORADO = 'Doutorado'
}

export interface FormacaoAcademicaCreateRequest {
  instituicao: string;
  curso: string;
  nivel: NivelFormacao;
  dataInicio: string;
  dataConclusao?: string;
  cursandoAtualmente?: boolean;
}

