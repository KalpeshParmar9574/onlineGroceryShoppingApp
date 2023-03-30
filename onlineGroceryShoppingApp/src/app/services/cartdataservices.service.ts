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
  constructor(private http:HttpClient) { }
  
  _storeItemInCart(data: any) {
 
    let cartData = localStorage.getItem('cartData');
    if (cartData) {
      const newCartData = JSON.parse(cartData);
      newCartData.push(data)
      localStorage.setItem('cartData', JSON.stringify(newCartData))
    } else {
      localStorage.setItem('cartData',JSON.stringify([data]))
    }
    
  }
  _getStoreCartData() {
   return localStorage.getItem('cartData')
  }
  _updateCartInServer(data:any) {
    this.http.post<any>(this.baseURL+this.cartURL,data)
  }
  _updateSingleProductValueInLocalStoarge(pid:number ,newProdQYT:number) {
    let cartItems
    const data = localStorage.getItem('cartData');
    if (data) {
      cartItems = JSON.parse(data)
      cartItems[pid].prodQYT = newProdQYT;
      cartItems[pid].totalPrice = newProdQYT * cartItems[pid].prodPrice;
    }

  }
}
