import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidato, CandidatoCreateRequest } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private readonly API_URL = `${environment.apiUrl}/candidatos`;

  constructor(private http: HttpClient) {}

  criar(candidato: CandidatoCreateRequest): Observable<Candidato> {
    return this.http.post<Candidato>(this.API_URL, candidato);
  }

  listarTodos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Candidato> {
    return this.http.get<Candidato>(`${this.API_URL}/${id}`);
  }

  atualizar(id: number, candidato: Partial<Candidato>): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.API_URL}/${id}`, candidato);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  buscarPorEmail(email: string): Observable<Candidato> {
    return this.http.get<Candidato>(`${this.API_URL}/email/${email}`);
  }
}

