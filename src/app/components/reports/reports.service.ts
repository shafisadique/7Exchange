import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Replace with your token source
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adjust 'Bearer' prefix if necessary
    });
  }
  // getMasterLedger():Observable<any>{
  //   return this.http.get(`${this.baseUrl}/v1/master/allLedger`)
  // }

  getloginMasterReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/master/loginReport`, {
      headers: this.getHeaders()
    });
  }
  getloginSuperReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/super/loginReport`, {
      headers: this.getHeaders()
    });
  }
  getloginAgentReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/agent/loginReport`, {
      headers: this.getHeaders()
    });
  }
  getloginClientReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v1/client/loginReport`, {
      headers: this.getHeaders()
    });
  }

  // getAllLoginMaster():Observable<any>{
  //   return this.http.get(`${this.baseUrl}/v1/master/loginReport`);
  // }
}
