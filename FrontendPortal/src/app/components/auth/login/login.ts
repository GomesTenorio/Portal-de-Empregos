import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService, LoginRequest } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    senha: ''
  };
  
  loading = false;
  errorMessage = '';
  returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Obter URL de retorno se fornecida
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (!this.loginData.email || !this.loginData.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        
        // Redirecionar baseado no tipo de usuário
        if (response.usuario.tipoConta === 'Candidato') {
          this.router.navigate(['/candidate/dashboard']);
        } else if (response.usuario.tipoConta === 'Empresa') {
          this.router.navigate(['/company/dashboard']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro no login:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Email ou senha incorretos.';
        } else if (error.status === 403) {
          this.errorMessage = 'Conta inativa ou bloqueada.';
        } else {
          this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        }
      }
    });
  }

  clearError() {
    this.errorMessage = '';
  }
}

