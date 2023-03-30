import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  baseURL = environment.baseURL;
  userURL = environment.userURL;
  cartURL = environment.cartURL;
  login = environment.login;
  userData!: any;
  serverURL = environment.serverURL;
  registerURL = environment.register
  constructor(private http: HttpClient) { }

  // register the new user this is send the data to the backend
  registerUser(body:any) {
    try {
      console.log("api is called");
      return this.http.post<any>(this.serverURL + this.registerURL, body);
      
    } catch (error:any) {
      return throwError (()=>{ new Error(error)})
      
    }
  }

  // this is take an  user data from the appdb.json to verify with
  loginUser(data:any) {
    try {
      console.log("api is called ")
      return this.http.post(this.serverURL + this.login,data);
    } catch (error:any) {
      return throwError(() => {
        new Error(error)
      })
    }
  }
  // this is take the signle user data from the appdb.json particularly it is get the data in home page when user is logged in and redirect to home page with verfied users id 
  getUserData(id: any) {
    try {
      return this.http.get<any>(`${this.baseURL}${this.userURL}/${id}`)
    } catch (error:any) {
      return throwError(() => {
        new Error(error)
      })
      
    }
  }
  // method for updating user data in the server it is take the userID and the data and update the particular users data in the server 
  _updateUserData( id:any,body:any) {
    try {
      return this.http.put<any>(`${this.baseURL}${this.userURL}/${id}`,body)
    } catch (error:any) {
      return throwError(() => {
        new Error(error)
      })
    }
    
}
  // this is take the user data from logged in page and store in variable to use in every components 
  _setLoggedInUserData(data: any) {
  localStorage.setItem('userData',JSON.stringify([data]));
    
    
  } 
  // this method is gives the loggedin user data 
  _getLoggedInUserData() {
   return  localStorage.getItem('userData')
  }

  _logOutUser() {
    localStorage.clear();
 }
 
  _storeUserToken(auth:any) {
    localStorage.setItem('userAuth',auth)
  }
}
