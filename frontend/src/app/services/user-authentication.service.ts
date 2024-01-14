import { HttpClient, HttpContext, HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit, Provider, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { LoginInfo, LoginInfoStatus } from '../models/login.model';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  accessToken: string
  expirationTime: string
  type: string
}

export const NO_AUTH = new HttpContextToken<boolean>(() => false);

function isExpired(token: AuthResponse) {
  let time = token.expirationTime;
  if(!time) {
    return true;
  }
  let exp = new Date(time)
  let now = new Date()
  if(now >= exp) {
    return true;
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private http: HttpClient,
    private router: Router) {

  }

  private _init: WritableSignal<boolean> = signal(false);

  auth: WritableSignal<AuthResponse | null> = signal(null);

  private _message: WritableSignal<string> = signal("Unkown Error");

  private _status: WritableSignal<LoginInfoStatus> = signal(LoginInfoStatus.NOT_LOGGED_IN);

  username: WritableSignal<string> = signal("");

  init() {
    if(!this._init()) {
      let raw = localStorage.getItem('auth-response');
      if(raw != null) {
        this.auth.set(JSON.parse(raw));
        let token = this.auth();
        if(token == null || isExpired(token)) {
          this.auth.set(null);
        } else {
          raw = localStorage.getItem('auth-username');
          if(raw != null) {
            this.username.set(raw);
          }
          this.status.set(LoginInfoStatus.LOGGED_IN);
        }
      }
    }

    this._init.set(true);
  }

  login(info: LoginInfo) {
    this.username.set(info.username);
    this.status.set(LoginInfoStatus.PENDING);
    this.http
    .post<AuthResponse>("/api/auth", info, {observe: 'response', context: new HttpContext().set(NO_AUTH, true)})
    .pipe(catchError((error: HttpErrorResponse) => {
      this.status.set(LoginInfoStatus.FAIL);
      this.message.set("Login failed");
      console.log(error);
      return of(null);
    }))
    .subscribe(response => {
      if(response != null) {
        this.status.set(LoginInfoStatus.LOGGED_IN);
        this.message.set("Login successful");
        this.auth.set(response.body);
        localStorage.setItem('auth-response', JSON.stringify(response.body));
        localStorage.setItem('auth-username', this.username());
      }
    })
  }

  logout() {
    this.status.set(LoginInfoStatus.NOT_LOGGED_IN);
    this.auth.set(null);
    localStorage.removeItem('auth-response');
    localStorage.removeItem('auth-username');
    this.router.navigate(['/login']);
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }
}

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private service: UserAuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.context.has(NO_AUTH)) {
      return next.handle(req);
    }

    let token = this.service.auth()
    if(this.service.status() != LoginInfoStatus.LOGGED_IN || !token || isExpired(token)) {
      this.service.logout();
      return throwError(() => "Not logged in");
    }

    const clonedreq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this.service.auth()?.accessToken
      )
    });

    return next.handle(clonedreq).pipe(catchError(
      (error: HttpErrorResponse) => {
        if(error.status == 401) {
          this.service.logout();
          return throwError(() => error);
        }
        return throwError(() => error);
      }
    ));
  }

}

export const authInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true };
