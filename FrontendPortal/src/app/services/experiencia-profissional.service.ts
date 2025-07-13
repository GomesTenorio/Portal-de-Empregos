import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExperienciaProfissional, ExperienciaProfissionalCreateRequest } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaProfissionalService {
  private readonly API_URL = `${environment.apiUrl}/experiencias`;

  constructor(private http: HttpClient) {}

  criar(experiencia: ExperienciaProfissionalCreateRequest, candidatoId: number): Observable<ExperienciaProfissional> {
    const params = new HttpParams().set('candidatoId', candidatoId.toString());
    return this.http.post<ExperienciaProfissional>(this.API_URL, experiencia, { params });
  }

  listarTodas(): Observable<ExperienciaProfissional[]> {
    return this.http.get<ExperienciaProfissional[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<ExperienciaProfissional> {
    return this.http.get<ExperienciaProfissional>(`${this.API_URL}/${id}`);
  }

  atualizar(id: number, experiencia: Partial<ExperienciaProfissional>): Observable<ExperienciaProfissional> {
    return this.http.put<ExperienciaProfissional>(`${this.API_URL}/${id}`, experiencia);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  buscarPorCandidato(candidatoId: number): Observable<ExperienciaProfissional[]> {
    return this.http.get<ExperienciaProfissional[]>(`${this.API_URL}/candidato/${candidatoId}`);
  }
}

