import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signupUrl = 'http://localhost:4000/user/signup';

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }
}