import { Candidato } from './candidato.model';
import { Empresa } from './empresa.model';

export interface Usuario {
  id?: number;
  email: string;
  senhaHash?: string;
  tipoConta: TipoConta;
  referenciaId?: number;
  dataCadastro?: Date;
  ultimoLogin?: Date;
  status: StatusUsuario;
  candidato?: Candidato;
  empresa?: Empresa;
}

export enum TipoConta {
  CANDIDATO = 'Candidato',
  EMPRESA = 'Empresa',
  ADMINISTRADOR = 'Administrador'
}

export enum StatusUsuario {
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
  BLOQUEADO = 'Bloqueado'
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  senha: string;
  tipoConta: TipoConta;
}

