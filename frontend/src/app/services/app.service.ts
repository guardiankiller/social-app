import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _error = new BehaviorSubject<null | string>(null);

  constructor() { 
  }

  public set error(err: string) {
    this._error.next(err);
  }

  public clearError() {
    this._error.next(null);
  }

  public errorObs(): Observable<null | string> {
    return this._error;
  }
}
