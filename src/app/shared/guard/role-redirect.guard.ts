import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleRedirectGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/auth/login']);
        }

        const userRole = this.authService.getUserRole();
        if (userRole === 'AGENT') {
          return this.router.createUrlTree(['/client/client-details']);
        } else if (userRole === 'ADMIN') {
          return this.router.createUrlTree(['/admin/dashboard']);
        } else {
          return true;
        }
      })
    );
  }
}
