import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; 
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      const isValid = await this.authService.validateToken(JSON.parse(token));
      if (isValid) {
        return true;
      } else {
        this.authService.removeJWTToken();
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
