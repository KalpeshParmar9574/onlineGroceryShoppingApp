import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  serverURL = environment.serverURL
  loginURL = environment.login
  registerURL = environment.register


  constructor(private http:HttpClient) { }

  _userLogin(body:any) {
    try {
     return  this.http.post<any>(this.serverURL+this.loginURL,body)
    } catch (error:any) {
      return throwError (()=>{ new Error(error)})
      
    }
  }
  _userRegister(body:any) {
    try {
      return this.http.post<any>(this.serverURL+this.registerURL,body)
    } catch (error:any) {
      return throwError (()=>{ new Error(error)})
    }
  }
}
