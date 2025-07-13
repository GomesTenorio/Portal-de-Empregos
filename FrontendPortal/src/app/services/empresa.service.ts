import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa, EmpresaCreateRequest } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private readonly API_URL = `${environment.apiUrl}/empresas`;

  constructor(private http: HttpClient) {}

  criar(empresa: EmpresaCreateRequest): Observable<Empresa> {
    return this.http.post<Empresa>(this.API_URL, empresa);
  }

  listarTodas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API_URL}/${id}`);
  }

  atualizar(id: number, empresa: Partial<Empresa>): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.API_URL}/${id}`, empresa);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  buscarPorEmail(email: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API_URL}/email/${email}`);
  }

  buscarPorCnpj(cnpj: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API_URL}/cnpj/${cnpj}`);
  }
}

