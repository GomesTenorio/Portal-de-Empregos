import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { JobListComponent } from './components/jobs/job-list/job-list';
import { JobDetailComponent } from './components/jobs/job-detail/job-detail';
import { LoginComponent } from './components/auth/login/login';
import { RegisterCandidateComponent } from './components/auth/register-candidate/register-candidate';
import { RegisterCompanyComponent } from './components/auth/register-company/register-company';
import { CandidateDashboardComponent } from './components/candidate/dashboard/dashboard';
import { CompanyDashboardComponent } from './components/company/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { TipoConta } from './models';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/candidate', component: RegisterCandidateComponent },
  { path: 'register/company', component: RegisterCompanyComponent },
  { 
    path: 'candidate/dashboard', 
    component: CandidateDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [TipoConta.CANDIDATO] }
  },
  { 
    path: 'company/dashboard', 
    component: CompanyDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [TipoConta.EMPRESA] }
  },
  { path: '**', redirectTo: '' }
];

