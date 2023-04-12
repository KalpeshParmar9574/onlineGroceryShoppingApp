import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  
   
  serverURL = environment.serverURL;
  userDataURL = environment.getUserData
  changePassURL = environment.changePassword
  registerURL = environment.register
  updateUserURL = environment.updateUser
  addAddressURL = environment.addAddress
  updateAddressURL = environment.updateAddress
  deleteAddressURL = environment.deleteAddress
  encryptionURL = environment.encryption
  token:any
  constructor(private http: HttpClient, private cookieService:CookieService) {
    this.token= this.cookieService.get('authToken');
   }

  
  getUserData(id: any) {
  }

  _setLoggedInUserData(data: any) {
    localStorage.setItem('userData', JSON.stringify([data]));
    
    
  }
  // this method is gives the loggedin user data 
  _getLoggedInUserData() {
    return localStorage.getItem('userData')
  }

  

  //*** */ all methods for real apis ***//
 
  _updateUserData(data: any) {
    try {
      console.log("api is called ")
      return this.http.put<any>('https://a521-117-217-127-105.in.ngrok.io/api/v1/customer/update-customer', data);
    } catch (error: any) {
      return throwError(() => {
        new Error(error)
      })
    }
  }

  _addAddress(data: any) {
    try {
      return this.http.post<any>(this.serverURL + this.addAddressURL, data)
      
    } catch (error: any) {
      return throwError(() => {
        new Error(error)
      })
    }
    
  }

  _updateAddress(id: any,body:any) {
  debugger
  return this.encription(id).pipe(
    switchMap((res) => {
      if (res.status === 200) {
        const encData = res.data
        console.log(encData, 'encData from encryption');
        
        return this.http.put('https://a521-117-217-127-105.in.ngrok.io/api/v1/customer/update-customer-address', {
          headers: new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
            'address_id': encData,
           
          })
        },body)
        
      } else {
        return throwError('encryption failed')
     }
   })
 )
  }
  _deleteAddress(id:any) {
    return this.encription(id).pipe(
      switchMap((res) => {
        if (res.status === 200) {
          const encData = res.data
          console.log(encData, 'encData from encryption');
          return this.http.delete<any>(this.serverURL + this.deleteAddressURL, {
            headers: new HttpHeaders({
              'ngrok-skip-browser-warning': 'skip-browser-warning',
              'Access-Control-Allow-Origin': '*',
              'address_id': encData,
            })
          })
          
        } else {
          return throwError('encryption failed')
       }
     })
   )
  }

  _getUserDataFromServer() {
    try {
      return this.http.get<any>(this.serverURL + this.userDataURL, { headers: new HttpHeaders({ 'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*' }) })
    } catch (error: any) {
      return throwError(() => {
        new Error(error)
      })
    }
  }
  _changePass(data: any) {
    try {
      return this.http.put<any>(this.serverURL + this.changePassURL, data)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }

  _logOutUser() {
    localStorage.clear();
  }
  // encription method
  encription(id: any) {
    // Call the encryption API with the provided slug
    return this.http.get<any>(this.serverURL + this.encryptionURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        'id': id,
      }),
    });
  
  }
}