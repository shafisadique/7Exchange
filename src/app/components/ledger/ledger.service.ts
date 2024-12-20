import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getLedger(page:any){
    return this.http.get(`${this.baseUrl}/v1/ledger/my/${page}`);
  }
  getMasterLedger():Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/master/allLedger`);
  }
  getSuperLedger():Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/super/allLedger`);
  }
  getAgentLedger():Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/agent/allLedger`);
  }
  getClientLedger():Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/client/allLedger`);
  }
}
