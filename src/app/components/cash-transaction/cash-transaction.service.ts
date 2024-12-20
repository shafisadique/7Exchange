import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {
  baseUrl= environment.apiUrl;
  serverUrl =environment.servierApiForSub;

  constructor(private httpClient:HttpClient) { }

  getAllLedgerSub():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/sub/allLedger`);
  }
  getAllSub():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/sub/page`);
  }
  
  getAllSubLedger(id:any,page:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/sub/ledger/${id}/${page}`)
  }
  getAllMasterLedger(id:any,page:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/master/ledger/${id}/${page}`)
  }

  getAllSuperLedger(id:any,page:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/super/ledger/${id}/${page}`)
  }

  getAllAgentLedger(id:any,page:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/agent/ledger/${id}/${page}`)
  }
  getAllClientLedger(id:any,page:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/client/ledger/${id}/${page}`)
  }


  getAllSubTransaction():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/sub/ct`);
  }
  getAllSubCollection():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/sub/ct`)
  }
  postAllSubTransaction(data:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/v1/sub/ct/save`,data)
  }
  
  getAllMasterCollection():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/master/ct`)
  }
  postAllMasterTransaction(data:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/v1/master/ct/save`,data)
  }

  getAllSuperCollection():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/super/ct`)
  }
  postAllSuperTransaction(data:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/v1/super/ct/save`,data)
  }

  getAllAgentCollection():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/agent/ct`)
  }
  
  postAllAgentTransaction(data:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/v1/agent/ct/save`,data)
  }

  getAllClientCollection():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/v1/client/ct`)
  }
  postAllClientTransaction(data:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/v1/client/ct/save`,data)
  }

}
