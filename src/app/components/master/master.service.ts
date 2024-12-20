import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MasterContent, MasterResponse, SubAdminMaster } from './master.interface';
import { MasterData } from '../../../core/master-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private masterSubject = new BehaviorSubject<any>(MasterData);
  private apiUrl = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private httpClient:HttpClient) { }

  // getDummyData(page: number, pageSize: number): Observable<mast[]> {
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
    // const paginatedData = this.masterSubject.getValue().slice(startIndex, endIndex);
  //   return of(paginatedData);
  // }

  getMasterData(page: number, pageSize: number, sortColumn: string, sorted: boolean): Observable<MasterResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    // Add sorting parameters if sortColumn is provided
    if (sortColumn) {
      const sortOrder = sorted ? 'asc' : 'desc'; // Assume backend handles asc/desc based on sorted boolean
      params = params.set('sort', `${sortColumn},${sortOrder}`);
    }

    return this.httpClient.get<MasterResponse>(`${this.apiUrl}/v1/master/page/${page}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getMasterList(): Observable<MasterResponse> {
    return this.httpClient.get<MasterResponse>(`${this.apiUrl}/v1/master/page`);
  }

  getMasterLimit(subId:any,page:number,searchKey: string = ''){
    const params = new HttpParams()
      .set('key', searchKey);
    return this.httpClient.get(`${this.apiUrl}/v1/master/limit/${subId}/${page}`,{params});
  }
  
  patchMasterLimit(data:any){
    return this.httpClient.patch(`${this.apiUrl}/v1/master/limit`,data);
  }

  getCode(){
    sessionStorage.getItem('id');
  }


  // Create a new sub-admin
  createMasterAdmin(subId:any ,newMaster:MasterContent): Observable<MasterContent> {
    return this.httpClient.post<MasterContent>(`${this.apiUrl}/v1/master/${subId}/store`, newMaster)
      .pipe(
        map((response:MasterContent ) => response), // Return the response directly
        catchError(this.handleError)
      );
  }
  
  geSubData(code:string):Observable<SubAdminMaster>{
    return this.httpClient.get<SubAdminMaster>(`${this.apiUrl}/v1/master/sub/${code}`);
  }

  getSingleMaster(id:any):Observable<any>{
      const url =`${this.apiUrl}/v1/master/${id}`;
    return this.httpClient.get(url).pipe(catchError(this.handleError))

  }


  updateMaster(id: number, updatedData: Partial<MasterContent>): Observable<MasterContent> {
    return this.httpClient.put<MasterContent>(`${this.apiUrl}/v1/master/${id}/update`, updatedData, { headers: this.headers })
      .pipe(
        catchError(this.handleError) // Handle errors appropriately
      );
  }
  getlimitDummyData(page: number, pageSize: number, subAdminId?: string): Observable<any> {
    let data = this.masterSubject.getValue();
    if (subAdminId) {
      data = data.filter((item:any) => item.subAdminId === subAdminId);
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return of(paginatedData);
  }

  getTotalCount(): Observable<number> {
    return of(this.masterSubject.getValue().length);
  }
  // createDummyData(newSubAdmin: mast): Observable<mast[]> {
  //   const updatedSubAdmins = this.getMaster();
  //   updatedSubAdmins.push(newSubAdmin); // Add the new sub-admin to the array
  //   this.masterSubject.next(updatedSubAdmins); // Update the BehaviorSubject with the new list
  //   return this.getDummyData(1, 10); // Return the updated list as Observable
  // }
  // getMaster(): mast[] {
  //   return this.masterSubject.getValue();
  // }
  // updateAllStatus(isActive:boolean):Observable<mast[]>{
  //   let allMasterActiveAndDeactive = this.masterSubject.getValue();
  //   allMasterActiveAndDeactive = allMasterActiveAndDeactive.map(masterActive=>({
  //     ...masterActive,
  //     status:isActive
  //   }))
  //   this.masterSubject.next(allMasterActiveAndDeactive)
  //   return of(allMasterActiveAndDeactive)
  // }
  // getSingleDummyMaster(id:string):Observable<mast | undefined>{
  //   const master = this.masterSubject.getValue().find(m=>m.id==id);
  //   return of(master)
  // }

  // updateDummymaster(id:any,data:any):Observable<mast | null>{
  //   const currentData = this.masterSubject.getValue();
  //   const index = currentData.findIndex(m=>m.id == id);
  //   if(index !== -1){
  //     currentData[index] ={...currentData[index], ...data};
  //     this.masterSubject.next(currentData);
  //     return of(currentData[index])
  //   }
  //   return of(null)
  // }

  getTotalCurrentLimit(): Observable<number> {
    const allData = this.masterSubject.getValue();
    const totalCurrentLimit = allData.reduce((acc:any, curr:any) => acc + (curr.currentLimit || 0), 0);
    return of(totalCurrentLimit);
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
}
