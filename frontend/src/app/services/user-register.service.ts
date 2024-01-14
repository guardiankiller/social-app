import { Injectable, WritableSignal, signal } from '@angular/core';
import { UserRegister } from '../models/user-register.model';
import { HttpClient, HttpContext, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Status } from '../models/status.model';
import { catchError, map, mergeMap, of, timer } from 'rxjs';
import { NO_AUTH } from './user-authentication.service';

interface Response {
    code: number,
    body: string
}

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private _form: WritableSignal<UserRegister> = signal({
    username: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    dateOfBirth: new Date(),
    gender: 'MALE',
    password: "",
    confirmPassword: ""
  });

  private _message: WritableSignal<string> = signal("Unkown Error");

  private _status: WritableSignal<Status> = signal(Status.INIT);

  constructor(private http: HttpClient) { }

  get form() {
    return this._form;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  send() {
    this._status.set(Status.LOADING);
    timer(5000).pipe(mergeMap(e => this.register()))
    .subscribe(response => this.updateStatus(response));
  }

  private register() {
    return this.http
      .post<string>('/api/users', this.form(), {
        observe: 'response',
        context: new HttpContext().set(NO_AUTH, true)
      })
      .pipe(
        map(response => this.processResponse(response)),
        catchError((error: HttpErrorResponse) => this.processErrorResponse(error)))
  }

  private updateStatus(response: Response) {
    let code = response.code
    if(code == 201 || code == 200) {
      this.status.set(Status.SUCCESS);
    } else {
      this.status.set(Status.FAIL);
    }
    this.message.set(response.body);
  }

  private processResponse(response: HttpResponse<string>) {
    let message = 'Unkown error'
    if(response.body) {
      message = response.body
    }

    let result: Response = {
      code: response.status,
      body: message
    };
    return result;
  }

  private processErrorResponse(error: HttpErrorResponse) {
    let message = 'Unkown error'
    if((typeof error.error) == 'string') {
      message = error.error
    }
    let result: Response = {
      code: error.status,
      body: message
    };
    return of(result);
  }
}
