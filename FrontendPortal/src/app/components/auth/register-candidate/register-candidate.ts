import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterCandidateRequest } from '../../../services/auth.service';

@Component({
  selector: 'app-register-candidate',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-candidate.html',
  styleUrls: ['./register-candidate.css']
})
export class RegisterCandidateComponent {
  candidateData: RegisterCandidateRequest = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    genero: '',
    orientacaoSexual: '',
    identidadeGenero: ''
  };
  
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Opções para os campos de seleção
  generoOptions = [
    { value: 'MASCULINO', label: 'Masculino' },
    { value: 'FEMININO', label: 'Feminino' },
    { value: 'NAO_BINARIO', label: 'Não-binário' },
    { value: 'OUTRO', label: 'Outro' },
    { value: 'PREFIRO_NAO_INFORMAR', label: 'Prefiro não informar' }
  ];

  orientacaoOptions = [
    { value: 'HETEROSSEXUAL', label: 'Heterossexual' },
    { value: 'HOMOSSEXUAL', label: 'Homossexual' },
    { value: 'BISSEXUAL', label: 'Bissexual' },
    { value: 'PANSEXUAL', label: 'Pansexual' },
    { value: 'ASSEXUAL', label: 'Assexual' },
    { value: 'OUTRO', label: 'Outro' },
    { value: 'PREFIRO_NAO_INFORMAR', label: 'Prefiro não informar' }
  ];

  identidadeOptions = [
    { value: 'CISGÊNERO', label: 'Cisgênero' },
    { value: 'TRANSGÊNERO', label: 'Transgênero' },
    { value: 'NAO_BINARIO', label: 'Não-binário' },
    { value: 'GÊNERO_FLUIDO', label: 'Gênero fluido' },
    { value: 'OUTRO', label: 'Outro' },
    { value: 'PREFIRO_NAO_INFORMAR', label: 'Prefiro não informar' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.registerCandidate(this.candidateData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Cadastro realizado com sucesso! Você pode fazer login agora.';
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro no cadastro:', error);
        
        if (error.status === 409) {
          this.errorMessage = 'Este email já está cadastrado.';
        } else if (error.status === 400) {
          this.errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
        } else {
          this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        }
      }
    });
  }

  validateForm(): boolean {
    if (!this.candidateData.nome || !this.candidateData.email || !this.candidateData.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return false;
    }

    if (this.candidateData.senha !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return false;
    }

    if (this.candidateData.senha.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return false;
    }

    if (!this.isValidEmail(this.candidateData.email)) {
      this.errorMessage = 'Por favor, insira um email válido.';
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}

