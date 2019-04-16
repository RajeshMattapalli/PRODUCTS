import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private loginUrl = environment.baseUrl + '/api/login';

  login(loginCredentials): Observable<User> {
    const url = `${this.loginUrl}`;
    return this.http.post<User>(url, loginCredentials, httpOptions);
  }
}

