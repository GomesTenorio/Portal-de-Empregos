import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  vagasRecentes: Vaga[] = [];
  loading = false;

  constructor(private vagaService: VagaService) {}

  ngOnInit() {
    this.carregarVagasRecentes();
  }

  carregarVagasRecentes() {
  this.loading = true;
  this.vagaService.listarVagas().subscribe({
    next: (vagas: Vaga[]) => {
      this.vagasRecentes = vagas.slice(0, 6); // Limita a 6 vagas
      this.loading = false;
    },
    error: (error) => {
      console.error('Erro ao carregar vagas:', error);
      this.loading = false;
    }
  });
}
}

