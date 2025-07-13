export interface Empresa {
  id?: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  setor?: string;
  porte: PorteEmpresa;
  descricao?: string;
  website?: string;
  logoUrl?: string;
  dataCadastro?: Date;
  status: StatusEmpresa;
}

export enum PorteEmpresa {
  MICRO = 'Micro',
  PEQUENA = 'Pequena',
  MEDIA = 'Media',
  GRANDE = 'Grande'
}

export enum StatusEmpresa {
  ATIVA = 'Ativa',
  INATIVA = 'Inativa',
  PENDENTE = 'Pendente'
}

export interface EmpresaCreateRequest {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  porte: PorteEmpresa;
  segmento?: string;
  email: string;
  telefone?: string;
  site?: string;
  enderecoRua?: string;
  enderecoNumero?: string;
  enderecoComplemento?: string;
  enderecoBairro?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
  enderecoCep?: string;
  descricaoEmpresa?: string;
  logoUrl?: string;
}

