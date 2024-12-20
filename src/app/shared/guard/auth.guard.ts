import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data-loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        const userRole = this.authService.getUserRole();
        if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
          this.router.navigate(['/unauthorized']); // dedicated unauthorized access page
          this.authService.logOut();
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.error('Authorization error:', error);
        this.router.navigate(['/error']);
        return of(false);
      })
    );
  }
  
}
