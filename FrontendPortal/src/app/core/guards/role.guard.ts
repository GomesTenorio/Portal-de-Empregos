import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TipoConta } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as TipoConta[];
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !expectedRoles.includes(currentUser.tipoConta)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

