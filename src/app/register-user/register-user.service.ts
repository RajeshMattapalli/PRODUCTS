import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RegisterUserService {

  constructor(private http: HttpClient) { }

  private registerUser = environment.baseUrl + '/api/registerUser'

  register(registerDetails): Observable<User> {
    const url = `${this.registerUser}`;
    return this.http.post<User>(url, registerDetails, httpOptions);
  }
}
