import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderDataServiceService {
  serverURL= environment.serverURL
  addOrderURL = environment.addOrder;
  getOrderURL = environment.getOrder;
  token: any 
  constructor(private http: HttpClient, private cookieService: CookieService) {  
  }
  
  
  
  _addOrder(add_id: any,bill_add_id:any, payment_status_id: any,order_status:any, body: any) {
    debugger
    this.token = this.cookieService.get('authToken');
    try {
          return this.http.post<any>(this.serverURL+this.addOrderURL,body,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*',"billing_address_id":bill_add_id,"delivery_address_id":add_id,"payment_status":payment_status_id,"order_status":order_status})})
        } catch (error:any) {
          return throwError(() => new Error(error))
        }
  
    
  }

  _storeOrderDataLocal(body:any) {
    let data = localStorage.getItem('orderHistoryData')
    if (data) {
      let tempdata = JSON.parse(data)
      tempdata.push(body)
      localStorage.setItem('orderHistoryData',JSON.stringify('tempdata'))
    } else {
      localStorage.setItem('orderHistoryData',JSON.stringify(body))
    }
  }
}



// Add_Order(data:any,delivery_address_id:any,billing_address_id:any,payment_status:any,order_status:any){
//   try {
//     return this.http.post<any>(this.baseUrl+this.add_order,data,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*',"billing_address_id":billing_address_id,"delivery_address_id":delivery_address_id,"payment_status":payment_status,"order_status":order_status})})
//   } catch (error:any) {
//     return throwError(() => new Error(error))
//   }
// }