import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface RegisterCandidateRequest {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  genero?: string;
  orientacaoSexual?: string;
  identidadeGenero?: string;
}

export interface RegisterCompanyRequest {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  senha: string;
  telefone?: string;
  setor?: string;
  tamanho?: string;
  descricao?: string;
  site?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar se há um usuário logado no localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Login
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token && response.usuario) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.usuario));
            this.currentUserSubject.next(response.usuario);
          }
        })
      );
  }

  // Registro de candidato
  registerCandidate(userData: RegisterCandidateRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/candidatos`, userData);
  }

  // Registro de empresa
  registerCompany(userData: RegisterCompanyRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/auth/register/empresa`, userData);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  // Verificar se está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token') && !!this.currentUserSubject.value;
  }

  // Obter usuário atual
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obter tipo de usuário
  getUserType(): string | null {
    const user = this.getCurrentUser();
    return user?.tipoConta || null;
  }

  // Verificar se é candidato
  isCandidate(): boolean {
    return this.getUserType() === 'CANDIDATO';
  }

  // Verificar se é empresa
  isCompany(): boolean {
    return this.getUserType() === 'EMPRESA';
  }

  // Verificar se é admin
  isAdmin(): boolean {
    return this.getUserType() === 'ADMINISTRADOR';
  }

  // Atualizar dados do usuário
  refreshUserData(): Observable<Usuario> {
    const userId = this.getCurrentUser()?.id;
    if (!userId) {
      throw new Error('Usuário não encontrado');
    }
    
    return this.http.get<Usuario>(`${this.API_URL}/usuarios/${userId}`)
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }
}

