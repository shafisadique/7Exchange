import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRole } from './role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  
  setUserRole(role: UserRole | null) {
    console.log(role);
    this.userRoleSubject.next(role);
  }

  getUserRole(): Observable<UserRole | null> {
    return this.userRoleSubject.asObservable();
  }
}
