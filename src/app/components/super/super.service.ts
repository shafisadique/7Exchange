import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { ApiResponse, Master, SuperData } from './super.interface';
import { SuperDummyData } from '../../../core/super-dummy-data';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperService {
  apiUrls= environment.apiUrl
  private superSubject = new BehaviorSubject<SuperData[]>(SuperDummyData);

  constructor(private http: HttpClient) { }
  
  
  getSuperData(page: number, pageSize: number): Observable<ApiResponse> {
    const url = `${this.apiUrls}/v1/super/page`;
    const params = {
      page: (page - 1).toString(), // API pages are usually zero-indexed
      size: pageSize.toString(),
    };
    console.log(params)
    return this.http.get<ApiResponse>(url, { params });
  }

  getSingleSuperData(id:any):Observable<SuperData>{
    return this.http.get<SuperData>(`${this.apiUrls}/v1/super/${id}`)
  }

  getSingleMasterData(id:any):Observable<any>{
    return this.http.get(`${this.apiUrls}/v1/super/master/${id}`);
  }

  getSuperService():Observable<SuperData>{
    return this.http.get<SuperData>(`${this.apiUrls}/v1/super/page`);
  }

  // Create a new sub-admin
    createSuper(masterId:any ,newMaster:SuperData): Observable<SuperData> {
      return this.http.post<SuperData>(`${this.apiUrls}/v1/super/${masterId}/store`, newMaster)
        .pipe(
          map((response:SuperData ) => response), // Return the response directly
          catchError(this.handleError)
        );
    }

  updateSuper(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrls}/v1/super/${id}/update`, updatedData)
      .pipe(
        catchError(this.handleError) // Handle errors appropriately
      );
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


  getTotalCount(): Observable<number> {
    return of(this.superSubject.getValue().length);
  }

  updateAllStatus(isActive: boolean): Observable<SuperData[]> {
    let currentSuper = this.superSubject.getValue();
    currentSuper = currentSuper.map(superData => ({
      ...superData,
      status: isActive
    }));
    this.superSubject.next(currentSuper); // Broadcast the updated list
    return of(currentSuper);
  }
  // createDummyData(newSubAdmin: SuperData): Observable<SuperData[]> {
  //   const updatedSubAdmins = this.getSuper();
  //   updatedSubAdmins.push(newSubAdmin); // Add the new sub-admin to the array
  //   this.superSubject.next(updatedSubAdmins); // Update the BehaviorSubject with the new list
  //   return this.getDummyData(1, 10); // Return the updated list as Observable
  // }

  getSuperLimit(masterId:any,page:number,searchVale:string){
    const params = new HttpParams()
      .set('key', searchVale);
    return this.http.get(`${this.apiUrls}/v1/super/limit/${masterId}/${page}`,{params});
  }
  patchSuperLimit(data:any){
    return this.http.patch(`${this.apiUrls}/v1/super/limit`,data);
  }
  
  getSingleDummySuper(id: string): Observable<SuperData | undefined> {
    const superData = this.superSubject.getValue().find(m => m.id === id);
    return of(superData);
  }
  getSuper(): SuperData[] {
    return this.superSubject.getValue();
  }

  // updateDummySuper(id: string, data: any): Observable<SuperData|null> {
  //   const currentData = this.superSubject.getValue();
  //   const index = currentData.findIndex(m => m.id === id);
  //   if (index !== -1) {
  //       // Update the record in the array with new data using spread operator for immutability
  //       currentData[index] = { ...currentData[index], ...data };
  //       // Emit the updated array through BehaviorSubject
  //       this.superSubject.next(currentData);
  //       // Return the updated record as an Observable
  //       return of(currentData[index]);
  //   }
  //   // Optionally handle the case where no item is found
  //   return of(null); // or throw an error or handle as appropriate
  // }

  // getlimitDummyData(page: number, pageSize: number, masterId?: string): Observable<SuperData[]> {
  //   let data = this.superSubject.getValue();
  //   // if (masterId) {
  //   //   data = data.filter(item => item.masterId === masterId);
  //   // }
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   const paginatedData = data.slice(startIndex, endIndex);

  //   return of(paginatedData);
  // }

  getTotalCurrentLimit(): Observable<number> {
    const allData = this.superSubject.getValue();
    const totalCurrentLimit = allData.reduce((acc, curr) => acc + (curr.currentLimit || 0), 0);
    return of(totalCurrentLimit);
  }
}
