import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga, PaginatedResponse } from '../models';
import { environment } from '../../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private readonly API_URL = `${environment.apiUrl}/vagas`;

  constructor(private http: HttpClient) {}

  // Listar vagas com paginação
  listarVagas(): Observable<Vaga[]> {
  return this.http.get<Vaga[]>(this.API_URL);
}

  // Buscar vagas com filtros (sem paginação)
  buscarComFiltros(filtros: VagaSearchFilters): Observable<Vaga[]> {
    let params = new HttpParams();
    
    Object.keys(filtros).forEach(key => {
      const value = (filtros as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<Vaga[]>(`${this.API_URL}/buscar-simples`, { params });
  }

  // Buscar vaga por ID
  buscarPorId(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.API_URL}/${id}`);
  }

  // Listar localizações disponíveis
  listarLocalizacoes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/localizacoes`);
  }

  // Criar nova vaga (para empresas)
  criarVaga(vaga: any): Observable<Vaga> {
    return this.http.post<Vaga>(this.API_URL, vaga);
  }

  // Atualizar vaga (para empresas)
  atualizarVaga(id: number, vaga: Partial<Vaga>): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.API_URL}/${id}`, vaga);
  }

  // Deletar vaga (para empresas)
  deletarVaga(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Buscar vagas por empresa
  buscarPorEmpresa(empresaId: number): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.API_URL}/empresa/${empresaId}`);
  }

  // Buscar vagas ativas
  buscarVagasAtivas(): Observable<Vaga[]> {
  return this.http.get<Vaga[]>(`${this.API_URL}/ativas`);
}

  // Ativar/Desativar vaga
  alterarStatusVaga(id: number, status: string): Observable<Vaga> {
    return this.http.patch<Vaga>(`${this.API_URL}/${id}/status`, { status });
  }
}

