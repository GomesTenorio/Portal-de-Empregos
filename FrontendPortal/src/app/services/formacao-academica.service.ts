import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormacaoAcademica, FormacaoAcademicaCreateRequest } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormacaoAcademicaService {
  private readonly API_URL = `${environment.apiUrl}/formacoes`;

  constructor(private http: HttpClient) {}

  salvar(candidatoId: number, formacao: FormacaoAcademicaCreateRequest): Observable<FormacaoAcademica> {
    const params = new HttpParams().set('candidatoId', candidatoId.toString());
    return this.http.post<FormacaoAcademica>(this.API_URL, formacao, { params });
  }

  listarTodas(): Observable<FormacaoAcademica[]> {
    return this.http.get<FormacaoAcademica[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<FormacaoAcademica> {
    return this.http.get<FormacaoAcademica>(`${this.API_URL}/${id}`);
  }

  atualizar(id: number, formacao: Partial<FormacaoAcademica>): Observable<FormacaoAcademica> {
    return this.http.put<FormacaoAcademica>(`${this.API_URL}/${id}`, formacao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  buscarPorCandidato(candidatoId: number): Observable<FormacaoAcademica[]> {
    return this.http.get<FormacaoAcademica[]>(`${this.API_URL}/candidato/${candidatoId}`);
  }
}

