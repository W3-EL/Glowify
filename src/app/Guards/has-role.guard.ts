import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from 'src/app/Services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn$ && this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  
}
