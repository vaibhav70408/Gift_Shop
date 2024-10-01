import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginStatus = false;
  private LoginUrl = 'http://localhost:4000/user/login';
  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(this.LoginUrl, userData).pipe(
      catchError(error => {
        this.loginStatus=true;
        return throwError(() => error);
      })
    );
  }
}
