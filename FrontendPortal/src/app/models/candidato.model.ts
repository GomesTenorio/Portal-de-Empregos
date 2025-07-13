export interface Candidato {
  id?: number;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  dataNascimento?: Date;
  genero?: Genero;
  nacionalidade?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumoProfissional?: string;
  pretensaoSalarioMin?: number;
  pretensaoSalarioMax?: number;
  disponibilidadeParaViagem?: boolean;
  disponibilidadeParaMudanca?: boolean;
  dataCadastro?: Date;
  ultimoAcesso?: Date;
}

export enum Genero {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
  OUTRO = 'Outro',
  PREFIRO_NAO_INFORMAR = 'Prefiro_Nao_Informar'
}

export interface CandidatoCreateRequest {
  nomeCompleto: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  genero?: Genero;
  nacionalidade?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumoProfissional?: string;
  pretensaoSalarioMin?: number;
  pretensaoSalarioMax?: number;
  disponibilidadeParaViagem?: boolean;
  disponibilidadeParaMudanca?: boolean;
}

