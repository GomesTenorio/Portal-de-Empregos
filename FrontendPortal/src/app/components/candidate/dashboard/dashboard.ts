import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CandidatoService } from '../../../services/candidato.service';
import { CandidaturaService } from '../../../services/candidatura.service';
import { VagaService } from '../../../services/vaga.service';
import { Candidato, Candidatura, Vaga } from '../../../models';
import { CandidaturaCreateRequest } from '../../../models/candidatura.model';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class CandidateDashboardComponent implements OnInit {
  candidate: Candidato | null = null;
  activeTab = 'overview';
  
  // Statistics
  totalApplications = 0;
  profileViews = 0;
  pendingApplications = 0;
  
  // Progress
  profileCompletion = 0;
  basicInfoProgress = 0;
  experienceProgress = 0;
  educationProgress = 0;
  
  // Data
  recentApplications: Candidatura[] = [];
  recommendedJobs: Vaga[] = [];

  constructor(
    private authService: AuthService,
    private candidatoService: CandidatoService,
    private candidaturaService: CandidaturaService,
    private vagaService: VagaService
  ) {}

  ngOnInit(): void {
    this.loadCandidateData();
    this.loadStatistics();
    this.loadRecentApplications();
    this.loadRecommendedJobs();
  }

  private loadCandidateData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.candidato) {
      this.candidate = currentUser.candidato;
      this.calculateProfileCompletion();
    }
  }

  private loadStatistics(): void {
    if (!this.candidate) return;

    // Load applications statistics
    this.candidaturaService.buscarPorCandidato(this.candidate.id!).subscribe({
      next: (applications) => {
        this.totalApplications = applications.length;
        this.pendingApplications = applications.filter(app => 
          app.status === 'Candidatura Enviada' || app.status === 'Em Análise'
        ).length;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        // Use mock data
        this.totalApplications = 12;
        this.pendingApplications = 5;
      }
    });

    // Mock profile views (would come from analytics API)
    this.profileViews = Math.floor(Math.random() * 50) + 10;
  }

  private loadRecentApplications(): void {
    if (!this.candidate) return;

    this.candidaturaService.buscarPorCandidato(this.candidate.id!).subscribe({
      next: (applications) => {
        this.recentApplications = applications
          .sort((a, b) => {
        const dateA = a.dataAplicacao ? new Date(a.dataAplicacao).getTime() : 0;
        const dateB = b.dataAplicacao ? new Date(b.dataAplicacao).getTime() : 0;
        return dateB - dateA;
      })
          .slice(0, 5);
      },
      error: (error) => {
        console.error('Erro ao carregar candidaturas recentes:', error);
        this.recentApplications = this.getMockApplications();
      }
    });
  }

  private loadRecommendedJobs(): void {
    if (!this.candidate) return;

    // Load jobs based on candidate's interests and experience
    const filters: any = {
      localizacaoCidade: this.candidate?.enderecoCidade,
      localizacaoEstado: this.candidate?.enderecoEstado
    };

    this.vagaService.buscarComFiltros(filters).subscribe({
      next: (jobs) => {
        this.recommendedJobs = jobs.slice(0, 6);
      },
      error: (error) => {
        console.error('Erro ao carregar vagas recomendadas:', error);
        this.recommendedJobs = this.getMockRecommendedJobs();
      }
    });
  }

  private calculateProfileCompletion(): void {
    if (!this.candidate) return;

    let completedFields = 0;
    const totalFields = 10;

    // Basic info (4 fields)
    if (this.candidate.nomeCompleto) completedFields++;
    if (this.candidate.telefone) completedFields++;
    if (this.candidate.enderecoCidade) completedFields++;
    if (this.candidate.dataNascimento) completedFields++;

    // Professional info (3 fields)
    if (this.candidate.resumoProfissional) completedFields++;
    if (this.candidate.linkedinUrl) completedFields++;
    if (this.candidate.portfolioUrl) completedFields++;

    // Additional info (3 fields)
    if (this.candidate.pretensaoSalarioMin) completedFields++;
    if (this.candidate.disponibilidadeParaViagem !== undefined) completedFields++;
    if (this.candidate.disponibilidadeParaMudanca !== undefined) completedFields++;

    this.profileCompletion = Math.round((completedFields / totalFields) * 100);

    // Calculate individual progress
    this.basicInfoProgress = Math.round(((this.candidate.nomeCompleto ? 1 : 0) + 
                                        (this.candidate.telefone ? 1 : 0) + 
                                        (this.candidate.enderecoCidade ? 1 : 0) + 
                                        (this.candidate.dataNascimento ? 1 : 0)) / 4 * 100);

    this.experienceProgress = Math.round(((this.candidate.resumoProfissional ? 1 : 0) + 
                                         (this.candidate.linkedinUrl ? 1 : 0) + 
                                         (this.candidate.portfolioUrl ? 1 : 0)) / 3 * 100);

    // Mock education progress (would be calculated from FormacaoAcademica)
    this.educationProgress = Math.floor(Math.random() * 100);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  editPhoto(): void {
    // Implement photo upload functionality
    alert('Funcionalidade de upload de foto será implementada.');
  }

  applyToJob(job: Vaga): void {
    if (!this.candidate) return;

    const candidaturaData: CandidaturaCreateRequest = {
      observacoes: ''
    };

    this.candidaturaService.criar(candidaturaData, this.candidate.id!, job.id!).subscribe({
      next: () => {
        alert('Candidatura enviada com sucesso!');
        this.loadStatistics();
        this.loadRecentApplications();
      },
      error: (error) => {
        console.error('Erro ao enviar candidatura:', error);
        alert('Erro ao enviar candidatura. Tente novamente.');
      }
    });
  }

  saveJob(job: Vaga): void {
    // Implement save job functionality
    alert('Vaga salva com sucesso!');
  }

  getActivityIcon(status: string): string {
    switch (status) {
      case 'Candidatura Enviada': return 'fas fa-paper-plane';
      case 'Em Análise': return 'fas fa-search';
      case 'Entrevista Agendada': return 'fas fa-calendar';
      case 'Entrevista Realizada': return 'fas fa-handshake';
      case 'Teste Aplicado': return 'fas fa-clipboard-check';
      case 'Oferecido': return 'fas fa-gift';
      case 'Contratado': return 'fas fa-check';
      case 'Rejeitado': return 'fas fa-times';
      case 'Retirado': return 'fas fa-undo';
      default: return 'fas fa-file';
    }
  }

  getActivityIconClass(status: string): string {
    switch (status) {
      case 'Candidatura Enviada': return 'bg-primary';
      case 'Em Análise': return 'bg-info';
      case 'Entrevista Agendada': return 'bg-warning';
      case 'Entrevista Realizada': return 'bg-info';
      case 'Teste Aplicado': return 'bg-warning';
      case 'Oferecido': return 'bg-success';
      case 'Contratado': return 'bg-success';
      case 'Rejeitado': return 'bg-danger';
      case 'Retirado': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Candidatura Enviada': return 'bg-primary';
      case 'Em Análise': return 'bg-info';
      case 'Entrevista Agendada': return 'bg-warning';
      case 'Entrevista Realizada': return 'bg-info';
      case 'Teste Aplicado': return 'bg-warning';
      case 'Oferecido': return 'bg-success';
      case 'Contratado': return 'bg-success';
      case 'Rejeitado': return 'bg-danger';
      case 'Retirado': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  private getMockApplications(): Candidatura[] {
    return [
      {
        id: 1,
        dataAplicacao: new Date(),
        status: 'Candidatura Enviada' as any,
        vaga: {
          id: 1,
          titulo: 'Desenvolvedor Full Stack',
          empresa: {
            id: 1,
            nomeFantasia: 'Tech Solutions',
            logoUrl: '',
            email: 'contato@techsolutions.com',
            razaoSocial: 'Tech Solutions Ltda',
            cnpj: '12345678000199',
            porte: 'Media' as any,
            status: 'Ativa' as any
          }
        } as Vaga,
        candidato: this.candidate!
      },
      {
        id: 2,
        dataAplicacao: new Date(Date.now() - 86400000), // 1 day ago
        status: 'Em Análise' as any,
        vaga: {
          id: 2,
          titulo: 'Analista de Marketing',
          empresa: {
            id: 2,
            nomeFantasia: 'Marketing Pro',
            logoUrl: '',
            email: 'contato@marketingpro.com',
            razaoSocial: 'Marketing Pro Ltda',
            cnpj: '98765432000188',
            porte: 'Pequena' as any,
            status: 'Ativa' as any
          }
        } as Vaga,
        candidato: this.candidate!
      }
    ];
  }

  private getMockRecommendedJobs(): Vaga[] {
    return [
      {
        id: 1,
        titulo: 'Desenvolvedor Frontend React',
        localizacaoCidade: 'São Paulo',
        localizacaoEstado: 'SP',
        modalidade: 'Remoto' as any,
        nivelExperiencia: 'Pleno' as any,
        salarioMin: 7000,
        salarioMax: 10000,
        empresa: {
          id: 1,
          nomeFantasia: 'Tech Startup',
          logoUrl: '',
          email: 'contato@techstartup.com',
          razaoSocial: 'Tech Startup Ltda',
          cnpj: '11111111000111',
          porte: 'Pequena' as any,
          status: 'Ativa' as any
        }
      } as Vaga,
      {
        id: 2,
        titulo: 'Desenvolvedor Backend Node.js',
        localizacaoCidade: 'Rio de Janeiro',
        localizacaoEstado: 'RJ',
        modalidade: 'Híbrido' as any,
        nivelExperiencia: 'Pleno' as any,
        salarioMin: 8000,
        salarioMax: 12000,
        empresa: {
          id: 2,
          nomeFantasia: 'Innovation Labs',
          logoUrl: '',
          email: 'contato@innovationlabs.com',
          razaoSocial: 'Innovation Labs Ltda',
          cnpj: '22222222000222',
          porte: 'Media' as any,
          status: 'Ativa' as any
        }
      } as Vaga
    ];
  }
}

