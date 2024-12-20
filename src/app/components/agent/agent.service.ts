import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AgentDetails } from './agnet.interface';
import { AgentDummyData } from '../../../core/agnet-dummy-data';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SuperData } from '../super/super.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiUrls= environment.apiUrl;
  private agnetSubject = new BehaviorSubject<AgentDetails[]>(AgentDummyData);

  constructor(private http: HttpClient) { }

  getSuperData(id:any):Observable<any>{
    return this.http.get(`${this.apiUrls}/v1/super/${id}`);
  }

  getAgentData(page: number, pageSize: number): Observable<AgentDetails> {
    const url = `${this.apiUrls}/v1/agent/page`;
    const params = {
      page: (page - 1).toString(), // API pages are usually zero-indexed
      size: pageSize.toString(),
    };
    console.log(params)
    return this.http.get<AgentDetails>(url, { params });
  }
  
  getSingleSuper(id:any):Observable<SuperData>{
    const url =`${this.apiUrls}/v1/agent/super/${id}`;
    return this.http.get<SuperData>(url).pipe(catchError(this.handleError))
  }

  getAgentLimit(superId:any,page:number,searchValue:string){
    const params = new HttpParams()
      .set('key', searchValue);
    return this.http.get(`${this.apiUrls}/v1/agent/limit/${superId}/${page}`,{params})
  }
  patchAgentLimit(data:any){
    return this.http.patch(`${this.apiUrls}/v1/agent/limit`,data);
  }

  createAgent(superId:any ,newAgent:AgentDetails): Observable<AgentDetails> {
    return this.http.post<AgentDetails>(`${this.apiUrls}/v1/agent/${superId}/store`, newAgent)
      .pipe(
        map((response:AgentDetails ) => response), // Return the response directly
        catchError(this.handleError)
      );
  }
  updateAgent(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrls}/v1/agent/${id}/update`, updatedData)
      .pipe(
        catchError(this.handleError) // Handle errors appropriately
      );
  }

  getSingleAgentData(id:any):Observable<any>{
    return this.http.get(`${this.apiUrls}/v1/agent/${id}`)
  }
  
  getSingleAgent(id:any):Observable<AgentDetails>{
    return this.http.get<AgentDetails>(`http://13.232.142.4:8080/api/v1/agent/${id}`);
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


  // getDummyData(page: number, pageSize: number): Observable<AgentDetails[]> {
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   const paginatedData = this.agnetSubject.getValue().slice(startIndex, endIndex);
  //   return of(paginatedData);
  // }
  // getTotalCount(): Observable<number> {
  //   return of(this.agnetSubject.getValue().length);
  // }
  // updateAllStatus(isActive: boolean): Observable<AgentDetails[]> {
  //   let currentAgnet = this.agnetSubject.getValue();
  //   currentAgnet = currentAgnet.map(superData => ({
  //     ...superData,
  //     status: isActive
  //   }));
  //   this.agnetSubject.next(currentAgnet); // Broadcast the updated list
  //   return of(currentAgnet);
  // }
  // createDummyData(newSubAdmin: AgentDetails): Observable<AgentDetails[]> {
  //   const updatedSubAdmins = this.getSuper();
  //   updatedSubAdmins.push(newSubAdmin); // Add the new sub-admin to the array
  //   this.agnetSubject.next(updatedSubAdmins); // Update the BehaviorSubject with the new list
  //   return this.getDummyData(1, 10); // Return the updated list as Observable
  // }
  // getSingleDummyAgent(id: string): Observable<AgentDetails | undefined> {
  //   const superData = this.agnetSubject.getValue().find(m => m.id === id);
  //   return of(superData);
  // }
  // getSuper(): AgentDetails[] {
  //   return this.agnetSubject.getValue();
  // }

  // updateDummyAgent(id: string, data: any): Observable<AgentDetails|null> {
  //   const currentData = this.agnetSubject.getValue();
  //   const index = currentData.findIndex(m => m.id === id);
  //   if (index !== -1) {
  //       // Update the record in the array with new data using spread operator for immutability
  //       currentData[index] = { ...currentData[index], ...data };
  //       // Emit the updated array through BehaviorSubject
  //       this.agnetSubject.next(currentData);
  //       // Return the updated record as an Observable
  //       return of(currentData[index]);
  //   }
  //   // Optionally handle the case where no item is found
  //   return of(null); // or throw an error or handle as appropriate
  // }
  // getlimitDummyData(page: number, pageSize: number, masterId?: string): Observable<AgentDetails[]> {
  //   let data = this.agnetSubject.getValue();
  //   // Filter data based on subAdminId if it is provided
  //   // if (masterId) {
  //   //   data = data.filter(item => item.masterId === masterId);
  //   // }
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   const paginatedData = data.slice(startIndex, endIndex);

  //   return of(paginatedData);
  // }
  // getTotalCurrentLimit(): Observable<number> {
  //   const allData = this.agnetSubject.getValue();
  //   const totalCurrentLimit = allData.reduce((acc, curr) => acc + (curr.currentLimit || 0), 0);
  //   return of(totalCurrentLimit);
  // }

  
}
