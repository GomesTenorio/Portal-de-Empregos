import { Candidato } from './candidato.model';

export interface ExperienciaProfissional {
  id?: number;
  candidato?: Candidato;
  cargo: string;
  empresa: string;
  dataInicio: Date;
  dataFim?: Date;
  descricaoAtividades?: string;
  empregoAtual?: boolean;
}

export interface ExperienciaProfissionalCreateRequest {
  cargo: string;
  empresa: string;
  dataInicio: string;
  dataFim?: string;
  descricaoAtividades?: string;
  empregoAtual?: boolean;
}

