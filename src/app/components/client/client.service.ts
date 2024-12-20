import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, clientAndProviderData, ClientApiDataResponse, ClientDataDetails } from './client.interface';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { ClientDummyData } from '../../../core/client-dummy-data';
import { AgentDetails } from '../agent/agnet.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.apiUrl;
  private clientSubject = new BehaviorSubject<ClientDataDetails[]>(ClientDummyData);

  constructor(private http:HttpClient) { }

  getClientData(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/v1/client/page`;
    const params = {
      page: (page - 1).toString(), // API pages are usually zero-indexed
      size: pageSize.toString(),
    };
    console.log(params)
    return this.http.get(url, { params });
  }

  createClient(agentId:any ,newMaster:Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/v1/client/${agentId}/store`, newMaster)
      .pipe(
        map((response:Client ) => response), // Return the response directly
        catchError(this.handleError)
      );
  }

  getSingleClientData(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/client/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    // Define a custom error message
    let errorMessage: any = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = { message: `Error: ${error.error.message}` };
    } else {
      // Server-side errors
      if (error.error && error.error.errors) {
        errorMessage = error.error.errors; // Capture server-side validation errors
      } else {
        errorMessage = { message: `Error Code: ${error.status}\nMessage: ${error.message}` };
      }
    }
    // Log the error to the console for debugging
    return throwError(() => new Error(JSON.stringify(errorMessage)));
  }

  getAgentList(): Observable<AgentDetails> {
    return this.http.get<AgentDetails>(`${this.baseUrl}/v1/agent/page`);
  }

  getClientLimit(agentId:any,page:number,searchValue:string){
    const params = new HttpParams()
      .set('key', searchValue);
    return this.http.get(`${this.baseUrl}/v1/client/limit/${agentId}/${page}`,{params})
  }

  patchClientLimit(data:any){
    return this.http.patch(`${this.baseUrl}/v1/client/limit`,data);
  }

  getSingleAgentData(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/v1/client/agent/${id}`);
  }

  updateClient(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/client/${id}/update`, updatedData)
      .pipe(
        catchError(this.handleError) // Handle errors appropriately
      );
  }










  // getDataByProviderId(apiUrl:any,page: number, pageSize: number, sortParams: string[] | string):Observable<ClientApiDataResponse>{
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('pageSize', pageSize.toString());

  //     if (Array.isArray(sortParams)) {
  //       sortParams.forEach((param, index) => {
  //         params = params.set(`sort[${index}]`, param);
  //       });
  //     } else if (typeof sortParams === 'string') {
  //       // Assume that sortParams is a single string
  //       params = params.set('sort', sortParams);
  //     }

  //   return this.http.get<ClientApiDataResponse>(`${this.baseUrl}${apiUrl}`, { params });
  // }

  getDummyData(page: number, pageSize: number): Observable<ClientDataDetails[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = this.clientSubject.getValue().slice(startIndex, endIndex);
    return of(paginatedData);
  }
  
  getTotalCount(): Observable<number> {
    return of(this.clientSubject.getValue().length);
  }
  updateAllStatus(isActive: boolean): Observable<ClientDataDetails[]> {
    let currentAgnet = this.clientSubject.getValue();
    currentAgnet = currentAgnet.map(clientData => ({
      ...clientData,
      status: isActive
    }));
    this.clientSubject.next(currentAgnet); // Broadcast the updated list
    return of(currentAgnet);
  }
  getSuper(): ClientDataDetails[] {
    return this.clientSubject.getValue();
  }
  createDummyData(newSubAdmin: ClientDataDetails): Observable<ClientDataDetails[]> {
    const updatedSubAdmins = this.getSuper();
    updatedSubAdmins.push(newSubAdmin); // Add the new sub-admin to the array
    this.clientSubject.next(updatedSubAdmins); // Update the BehaviorSubject with the new list
    return this.getDummyData(1, 10); // Return the updated list as Observable
  }

  getSingleDummyClient(id: string): Observable<ClientDataDetails | undefined> {
    const superData = this.clientSubject.getValue().find(m => m.id === id);
    return of(superData);
  }
  updateDummyClient(id: string, data: any): Observable<ClientDataDetails|null> {
    const currentData = this.clientSubject.getValue();
    const index = currentData.findIndex(m => m.id === id);
    if (index !== -1) {
        // Update the record in the array with new data using spread operator for immutability
        currentData[index] = { ...currentData[index], ...data };
        // Emit the updated array through BehaviorSubject
        this.clientSubject.next(currentData);
        // Return the updated record as an Observable
        return of(currentData[index]);
    }
    // Optionally handle the case where no item is found
    return of(null); // or throw an error or handle as appropriate
  }
  getlimitDummyData(page: number, pageSize: number, agentId?: string): Observable<ClientDataDetails[]> {
    let data = this.clientSubject.getValue();
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return of(paginatedData);
  }
  getTotalCurrentLimit(): Observable<number> {
    const allData = this.clientSubject.getValue();
    const totalCurrentLimit = allData.reduce((acc, curr) => acc + (curr.currentLimit || 0), 0);
    return of(totalCurrentLimit);
  }
}
