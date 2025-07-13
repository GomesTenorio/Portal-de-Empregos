import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { EmpresaCreateRequest, PorteEmpresa } from '../../../models/empresa.model';
import { MaskDirective } from './register-company-mask.directive';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaskDirective],
  templateUrl: './register-company.html',
  styleUrl: './register-company.css'
})
export class RegisterCompanyComponent implements OnInit {
  empresaForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.empresaForm = this.formBuilder.group({
      nomeFantasia: ['', [Validators.required, Validators.minLength(2)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(2)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      porte: ['', Validators.required],
      segmento: [''],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      site: [''],
      enderecoRua: [''],
      enderecoNumero: [''],
      enderecoComplemento: [''],
      enderecoBairro: [''],
      enderecoCidade: [''],
      enderecoEstado: [''],
      enderecoCep: [''],
      descricaoEmpresa: [''],
      logoUrl: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.empresaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.empresaForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const empresaData: EmpresaCreateRequest = {
        nomeFantasia: this.empresaForm.value.nomeFantasia,
        razaoSocial: this.empresaForm.value.razaoSocial,
        cnpj: this.empresaForm.value.cnpj,
        porte: this.empresaForm.value.porte as PorteEmpresa,
        segmento: this.empresaForm.value.segmento,
        email: this.empresaForm.value.email,
        telefone: this.empresaForm.value.telefone,
        site: this.empresaForm.value.site,
        enderecoRua: this.empresaForm.value.enderecoRua,
        enderecoNumero: this.empresaForm.value.enderecoNumero,
        enderecoComplemento: this.empresaForm.value.enderecoComplemento,
        enderecoBairro: this.empresaForm.value.enderecoBairro,
        enderecoCidade: this.empresaForm.value.enderecoCidade,
        enderecoEstado: this.empresaForm.value.enderecoEstado,
        enderecoCep: this.empresaForm.value.enderecoCep,
        descricaoEmpresa: this.empresaForm.value.descricaoEmpresa,
        logoUrl: this.empresaForm.value.logoUrl
      };

      this.empresaService.criar(empresaData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = 'Empresa cadastrada com sucesso! Redirecionando para o login...';
          
          // Redirecionar para login após 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erro ao cadastrar empresa:', error);
          
          if (error.status === 400) {
            this.errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
          } else if (error.status === 409) {
            this.errorMessage = 'CNPJ ou email já cadastrado. Verifique os dados.';
          } else {
            this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          }
        }
      });
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.empresaForm.controls).forEach(key => {
        this.empresaForm.get(key)?.markAsTouched();
      });
      
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}