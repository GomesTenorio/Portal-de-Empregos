import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VagaService } from '../../../services/vaga.service';
import { CandidaturaService } from '../../../services/candidatura.service';
import { AuthService } from '../../../services/auth.service';
import { Vaga } from '../../../models/vaga.model';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css']
})
export class JobDetailComponent implements OnInit {
  vaga: Vaga | null = null;
  loading = false;
  applying = false;
  hasApplied = false;
  vagaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService,
    private candidaturaService: CandidaturaService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vagaId = +params['id'];
      this.carregarVaga();
      this.verificarCandidatura();
    });
  }

  carregarVaga() {
    this.loading = true;
    this.vagaService.buscarPorId(this.vagaId).subscribe({
      next: (vaga) => {
        this.vaga = vaga;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vaga:', error);
        this.loading = false;
        this.router.navigate(['/jobs']);
      }
    });
  }

  verificarCandidatura() {
    if (this.authService.isAuthenticated() && this.authService.getUserType() === 'CANDIDATO') {
      this.candidaturaService.verificarCandidatura(this.vagaId).subscribe({
        next: (hasApplied) => {
          this.hasApplied = hasApplied;
        },
        error: (error) => {
          console.error('Erro ao verificar candidatura:', error);
        }
      });
    }
  }

  aplicarParaVaga() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: `/jobs/${this.vagaId}` } 
      });
      return;
    }

    if (this.authService.getUserType() !== 'CANDIDATO') {
      alert('Apenas candidatos podem se candidatar a vagas.');
      return;
    }

    this.applying = true;
    this.candidaturaService.candidatar(this.vagaId).subscribe({
      next: () => {
        this.hasApplied = true;
        this.applying = false;
        alert('Candidatura realizada com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao se candidatar:', error);
        this.applying = false;
        alert('Erro ao se candidatar. Tente novamente.');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isCandidato(): boolean {
    return this.authService.getUserType() === 'CANDIDATO';
  }

  formatarSalario(salario: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(salario);
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}

