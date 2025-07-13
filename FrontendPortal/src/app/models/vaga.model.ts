import { Empresa } from './empresa.model';
import { Habilidade } from './habilidade.model';

export interface Vaga {
  id?: number;
  empresa: Empresa;
  titulo: string;
  descricao: string;
  requisitos?: string;
  responsabilidades?: string;
  salarioMin?: number;
  salarioMax?: number;
  tipoSalario: TipoSalario;
  localizacaoCidade: string;
  localizacaoEstado: string;
  tipoContrato: TipoContrato;
  modalidade: Modalidade;
  setor?: string;
  areaProfissional?: string;
  nivelExperiencia: NivelExperiencia;
  beneficios?: string;
  dataPublicacao?: Date;
  dataExpiracao?: Date;
  status: StatusVaga;
  habilidades?: Habilidade[];
}

export enum TipoSalario {
  POR_HORA = 'Por_Hora',
  POR_MES = 'Por_Mes',
  POR_ANO = 'Por_Ano',
  NEGOCIAVEL = 'Negociável'
}

export enum TipoContrato {
  CLT = 'CLT',
  PJ = 'PJ',
  ESTAGIO = 'Estágio',
  TEMPORARIO = 'Temporário',
  FREELANCER = 'Freelancer',
  TRAINEE = 'Trainee'
}

export enum Modalidade {
  PRESENCIAL = 'Presencial',
  REMOTO = 'Remoto',
  HIBRIDO = 'Híbrido'
}

export enum NivelExperiencia {
  ESTAGIO = 'Estágio',
  JUNIOR = 'Júnior',
  PLENO = 'Pleno',
  SENIOR = 'Sênior',
  ESPECIALISTA = 'Especialista'
}

export enum StatusVaga {
  ABERTA = 'Aberta',
  FECHADA = 'Fechada',
  PAUSADA = 'Pausada'
}

export interface VagaCreateRequest {
  titulo: string;
  descricao: string;
  requisitos?: string;
  responsabilidades?: string;
  salarioMin?: number;
  salarioMax?: number;
  tipoSalario: TipoSalario;
  localizacaoCidade: string;
  localizacaoEstado: string;
  tipoContrato: TipoContrato;
  modalidade: Modalidade;
  setor?: string;
  areaProfissional?: string;
  nivelExperiencia: NivelExperiencia;
  beneficios?: string;
  dataExpiracao?: string;
}

export interface VagaSearchFilters {
  titulo?: string;
  localizacaoCidade?: string;
  localizacaoEstado?: string;
  modalidade?: string;
  tipoContrato?: string;
  nivelExperiencia?: string;
  salarioMin?: number;
  salarioMax?: number;
  setor?: string;
  areaProfissional?: string;
  empresaId?: number;
  status?: string;
}

