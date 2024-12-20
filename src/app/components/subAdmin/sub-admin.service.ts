import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
// import { SubAdmin } from '../../../core/sub-admin-dummy-data';
import { SubAdminContent, SubAdminResponse } from './sub-admin.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubAdminService {
  private subAdminsSubject = new BehaviorSubject<SubAdminContent[]>([]);
  private apiUrl = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient) {}

  getSubAdminData(page: number, pageSize: number, sortColumn: string, sorted: boolean): Observable<SubAdminResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    if (sortColumn) {
      const sortOrder = sorted ? 'asc' : 'desc'; // Assume backend handles asc/desc based on sorted boolean
      params = params.set('sort', `${sortColumn},${sortOrder}`);
    }
    return this.http.get<SubAdminResponse>(`${this.apiUrl}/v1/sub/page/${page}`).pipe(catchError(this.handleError));
  }

  getSubAdminLimit(page: number, searchKey: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('key', searchKey); // Add search query param
    return this.http.get(`${this.apiUrl}/v1/sub/limit/${page}`, { params });
  }

  updateSubAdminLimit(data:any){
    return this.http.patch(`${this.apiUrl}/v1/sub/limit`,data)
  }
  
 getSingleSubAdmin(id: string): Observable<SubAdminResponse> {
    return this.http.get<SubAdminResponse>(`${this.apiUrl}/v1/sub/get/${id}`).pipe(catchError(this.handleError))
  }

  listSubAdmin():Observable<SubAdminResponse>{
    return this.http.get<SubAdminResponse>(`${this.apiUrl}/v1/sub/page`).pipe(catchError(this.handleError))
  }

  // Create a new sub-admin
  createSubAdmin(newSubAdmin: SubAdminContent): Observable<SubAdminContent> {
    return this.http.post<SubAdminContent>(`${this.apiUrl}/v1/sub/store`, newSubAdmin, { headers: this.headers })
      .pipe(
        map((response: SubAdminContent) => response), // Return the response directly
        catchError(this.handleError)
      );
  }

  getAdminData():Observable<any>{
    return this.http.get(`${this.apiUrl}/v1/sub/admin`)
  }

  updateSubAdmin(id: number, updatedData: Partial<SubAdminContent>): Observable<SubAdminContent> {
    return this.http.put<SubAdminContent>(`${this.apiUrl}/v1/sub/${id}/update`, updatedData, { headers: this.headers })
      .pipe(
        catchError(this.handleError) // Handle errors appropriately
      );
  }
  
  getTotalCurrentLimit(): Observable<number> {
    return this.subAdminsSubject.asObservable().pipe(map(data => data.length));
  }

 
  getTotalCount(): Observable<number> {
    return of(this.subAdminsSubject.getValue().length);
  }


    // Handle HTTP errors
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
