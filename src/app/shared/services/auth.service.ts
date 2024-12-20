import { Injectable } from '@angular/core';
import { UserRole } from './role.enum';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NavService } from './nav.service';
import { RoleService } from './role.service';
import jwtDecode from 'jwt-decode'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private userRole: UserRole | null = null;
  private _isLoggedIn$=new BehaviorSubject<boolean>(false);
  private authToken: string | null = null;
  
  constructor(private http:HttpClient,private toastr:ToastrService,private roleService: RoleService) { 

    const token = sessionStorage.getItem('token');
    if (token) {
      this.authToken = token;
      this._isLoggedIn$.next(true);
      this.userRole = this.getUserRole();
      const role = this.getUserRoleFromSession();
      this.roleService.setUserRole(role); 
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/auth/login`, { username, password }).pipe(
      map((response:any) => {
        console.log(response)
        if (response && response.token) {
          this.toastr.success('Login Success',response.msg);
          this._isLoggedIn$.next(true);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('loginName',response.name)
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('id',response.id);

          this.userRole = this.mapRole(response.role);
          console.log(this.userRole)
          this.roleService.setUserRole(this.userRole); 
          
          if (this.userRole === UserRole.ADMIN) {
            sessionStorage.setItem('adminId', response.adminId);
          } else if (this.userRole === UserRole.PROVIDER) {
            sessionStorage.setItem('providerId', response.providerId);
          } else if (this.userRole === UserRole.CLIENT) {
            sessionStorage.setItem('clientId', response.clientId);
          }
        }
        return response;
      })
    );
  }


  getUserRoleFromSession(): any {
    const roleString = sessionStorage.getItem('role');
    return roleString ? this.mapRole(roleString) : null;
  }
  
  
  private mapRole(roleString: string): UserRole | null {
    switch (roleString) {
      case 'ADMIN':
        return UserRole.ADMIN;
      case 'SUB':
        return UserRole.SUB
      case 'PROVIDER':
        return UserRole.PROVIDER;
      case 'CLIENT':
        return UserRole.CLIENT;
      default:
        console.warn(`Unknown role: ${roleString}`);
        return null;
    }
  }

  
  // private getUserRoleFromSession(): UserRole | undefined {
  //   const roleString = sessionStorage.getItem('role');
  //   return roleString ? this.mapRole(roleString) : undefined;
  // }
  
  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }
  getProviderId(): string | null {
    return sessionStorage.getItem('providerId');
  }

  getUserRole(): UserRole {
    const roleString = sessionStorage.getItem('role');
    return UserRole[roleString as keyof typeof UserRole];
  }
  getUserToken(): string | null {
    return sessionStorage.getItem('token');
  }
  // getUserToken(): string | null {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }
  
  //   const decodedToken: any = jwtDecode(token);
  //   const currentTime = Math.floor(new Date().getTime() / 1000);
  
  //   if (decodedToken.exp < currentTime) {
  //     this.logOut(); // Token expired, log out the user
  //     return null;
  //   }
  
  //   return token;
  // }
  getUserDetails(){
    sessionStorage.getItem('currentUser')
  }

  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginName');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('providerId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    this.roleService.setUserRole(null);
    // this.navService.items.next([]);

  }
}
