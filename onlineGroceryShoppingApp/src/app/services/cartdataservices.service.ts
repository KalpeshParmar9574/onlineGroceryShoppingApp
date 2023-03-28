import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartdataservicesService {
  baseURL = environment.baseURL;
  cartURL = environment.cartURL;
  cartKEY: string = "cartKEY";
  constructor(private http: HttpClient,private window:Window) { }
  
  _getCartDataFromLocalStorage() {
    const cartJsonData = this.window.localStorage.getItem(this.cartKEY);
    return cartJsonData ? JSON.parse(cartJsonData) : null;
  }
  _setCartDataInLocalStorage(cartData:any) {
    this.window.localStorage.setItem(this.cartKEY, JSON.stringify(cartData))
    console.log("successfully done");
    
  }
  clearCartDataFromLocalStorage() {
    this.window.localStorage.removeItem(this.cartKEY)
  }

 
}
