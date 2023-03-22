import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      // Usuário autenticado e é um admin, pode acessar a rota
      return true;
    } else {
      // Usuário não está autenticado ou não é um admin, redirecionar para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(): boolean {
    return this.canActivate();
  }
}
