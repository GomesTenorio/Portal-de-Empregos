import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidatura, CandidaturaCreateRequest, StatusCandidatura } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  private readonly API_URL = `${environment.apiUrl}/candidaturas`;

  constructor(private http: HttpClient) {}

  // Candidatar-se a uma vaga
  candidatar(vagaId: number): Observable<Candidatura> {
    return this.http.post<Candidatura>(`${this.API_URL}/candidatar/${vagaId}`, {});
  }

  // Criar candidatura (método alternativo)
  criar(candidaturaData: CandidaturaCreateRequest, candidatoId: number, vagaId: number): Observable<Candidatura> {
    const params = new HttpParams()
      .set('candidatoId', candidatoId.toString())
      .set('vagaId', vagaId.toString());
    
    return this.http.post<Candidatura>(this.API_URL, candidaturaData, { params });
  }

  // Verificar se já se candidatou a uma vaga
  verificarCandidatura(vagaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/verificar/${vagaId}`);
  }

  // Listar candidaturas do candidato logado
  minhasCandidaturas(): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(`${this.API_URL}/minhas`);
  }

  // Buscar candidaturas por candidato (método adicional)
  buscarPorCandidato(candidatoId: number): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(`${this.API_URL}/candidato/${candidatoId}`);
  }

  // Buscar candidatura por ID
  buscarPorId(id: number): Observable<Candidatura> {
    return this.http.get<Candidatura>(`${this.API_URL}/${id}`);
  }

  // Cancelar candidatura
  cancelarCandidatura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Para empresas: listar candidaturas de suas vagas
  candidaturasDaEmpresa(): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(`${this.API_URL}/empresa`);
  }

  // Para empresas: buscar candidaturas por vaga
  candidaturasPorVaga(vagaId: number): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(`${this.API_URL}/vaga/${vagaId}`);
  }

  // Para empresas: atualizar status da candidatura
  atualizarStatus(id: number, status: StatusCandidatura): Observable<Candidatura> {
    return this.http.patch<Candidatura>(`${this.API_URL}/${id}/status`, { status });
  }

  // Buscar candidaturas por status
  buscarPorStatus(status: StatusCandidatura): Observable<Candidatura[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Candidatura[]>(`${this.API_URL}/status`, { params });
  }
}

