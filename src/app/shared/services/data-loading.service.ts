import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _dataLoaded$ = new BehaviorSubject<boolean>(false);
  public loading$ = this._dataLoaded$.asObservable();
  constructor() {
    // Simulate data loading
    this.loadInitialData(); 
  }

  // Simulate an async data loading process
  private loadInitialData(): void {
    of(true).pipe(
      delay(1000) // Simulate network delay
    ).subscribe(isLoaded => {
      this._dataLoaded$.next(isLoaded);
    });
  }

  // Observable to check if data is loaded
  get dataLoaded$(): Observable<boolean> {
    return this._dataLoaded$.asObservable();
  }

  // Method to check if data is loaded (can be used in guards)
  isDataLoaded(): boolean {
    return this._dataLoaded$.getValue();
  }

  // Method to trigger reloading data if necessary
  reloadData(): void {
    this._dataLoaded$.next(false);
    this.loadInitialData();
  }


  show(): void {
    this._dataLoaded$.next(true);
  }

  hide(): void {
    this._dataLoaded$.next(false);
  }
}
