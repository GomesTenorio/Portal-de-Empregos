import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VagaService } from '../../../services/vaga.service';
import { Vaga } from '../../../models/vaga.model';
import { PaginatedResponse } from '../../../models/index';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css']
})
export class JobListComponent implements OnInit {
  vagas: Vaga[] = [];
  loading = false;
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  // Filtros
  searchTerm = '';
  selectedLocation = '';
  selectedSalaryRange = '';
  selectedContractType = '';

  // Opções para filtros
  locations: string[] = [];
  salaryRanges = [
    { label: 'Até R$ 2.000', value: '0-2000' },
    { label: 'R$ 2.000 - R$ 4.000', value: '2000-4000' },
    { label: 'R$ 4.000 - R$ 6.000', value: '4000-6000' },
    { label: 'R$ 6.000 - R$ 10.000', value: '6000-10000' },
    { label: 'Acima de R$ 10.000', value: '10000-999999' }
  ];

  contractTypes = [
    { label: 'CLT', value: 'CLT' },
    { label: 'PJ', value: 'PJ' },
    { label: 'Estágio', value: 'ESTAGIO' },
    { label: 'Freelancer', value: 'FREELANCER' }
  ];

  constructor(private vagaService: VagaService) {}

  ngOnInit() {
    this.carregarVagas();
    this.carregarLocalizacoes();
  }

  carregarVagas() {
    this.loading = true;
    
    const filtros = {
      titulo: this.searchTerm || undefined,
      localizacaoCidade: this.selectedLocation.split(',')[0]?.trim() || undefined,
      localizacaoEstado: this.selectedLocation.split(',')[1]?.trim() || undefined,
      tipoContrato: this.selectedContractType || undefined,
      salarioMin: this.getSalarioMin(),
      salarioMax: this.getSalarioMax()
    };

      // Se não há filtros, usar listarVagas(), senão usar buscarComFiltros()
  const hasFilters = Object.values(filtros).some(value => value !== undefined);
  
  if (hasFilters) {
    this.vagaService.buscarComFiltros(filtros).subscribe({
      next: (vagas: Vaga[]) => {
        this.vagas = vagas;
        this.totalElements = vagas.length;
        this.totalPages = Math.ceil(vagas.length / this.pageSize);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vagas:', error);
        this.loading = false;
      }
    });
  } else {
    this.vagaService.listarVagas().subscribe({
      next: (vagas: Vaga[]) => {
        this.vagas = vagas;
        this.totalElements = vagas.length;
        this.totalPages = Math.ceil(vagas.length / this.pageSize);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vagas:', error);
        this.loading = false;
      }
    });
  }

  }

  carregarLocalizacoes() {
    this.vagaService.listarLocalizacoes().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (error) => {
        console.error('Erro ao carregar localizações:', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 0;
    this.carregarVagas();
  }

  onFilterChange() {
    this.currentPage = 0;
    this.carregarVagas();
  }

  limparFiltros() {
    this.searchTerm = '';
    this.selectedLocation = '';
    this.selectedSalaryRange = '';
    this.selectedContractType = '';
    this.currentPage = 0;
    this.carregarVagas();
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.carregarVagas();
    }
  }

  private getSalarioMin(): number | undefined {
    if (!this.selectedSalaryRange) return undefined;
    const [min] = this.selectedSalaryRange.split('-').map(Number);
    return min;
  }

  private getSalarioMax(): number | undefined {
    if (!this.selectedSalaryRange) return undefined;
    const [, max] = this.selectedSalaryRange.split('-').map(Number);
    return max;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}

