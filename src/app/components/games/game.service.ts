import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CompleteGame } from './game-interface';
import { completeGameDummyData } from '../../../core/complete-game-dummy-data';
import { CancelBets } from './cancel-bets/cancel-bets.interface';
import { responseData } from '../../../core/cancel-bets-dummy-data';
import { CancelBetsResponse } from './delete-bets-session/delete-session.interface';
import { cancelBetsDummyData } from '../../../core/cancle-bets-session-dummy-data';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiUrls =environment.apiUrl;
  
  constructor(private http:HttpClient) { }
  getCompleteGames(): Observable<CompleteGame[]> {
    return of(completeGameDummyData);
  }
  getCancleGameData():Observable<CancelBets>{
    return of(responseData)
  }
  getCancelSessionBetsData(): Observable<CancelBetsResponse> {
    return of(cancelBetsDummyData);
  }

  getInPlayGames(): Observable<any> {
    const url = `${this.apiUrls}/v1/game/inPlay`
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
