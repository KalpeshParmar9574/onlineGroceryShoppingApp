import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { order } from 'src/app/Models/cartItem.model';
import { OrderDataServiceService } from 'src/app/services/order-data-service.service';
import { ProductdataService } from 'src/app/services/productdata.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  title = "check out"
  userData!: any 
  userAdd!: any
  tempOrderData!: any
  encUserAddID!: any;
  userAddID!: any
  encStatus!: any
  encOrderStatus!: any
  encBillAddID!: any

  constructor(
    private productService: ProductdataService,
    private userService: UserServicesService,
    private cookieService: CookieService,
    private orderService: OrderDataServiceService,
    private router: Router
  ) { }
  ngOnInit() {
    this._getUserData()
    this._getOrderData()
  }
  _getUserData() {
    const data = sessionStorage.getItem('userData')
    if (data) {
      this.userData = JSON.parse(data)
      this.userAdd = this.userData.addresses
      console.log(this.userAdd);
      
    }
}
  _getOrderData() {
    const data = localStorage.getItem('tempOrderData')
    if (data) {
      this.tempOrderData = JSON.parse(data)
    }
    console.log(this.tempOrderData, 'temp order data');   
  }

  _placeOrder() {
  
    const body: order={
      order_date: new Date().toLocaleDateString('en-CA'),
      special_note: "first",
      estimate_delivery_date: new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString('en-CA'),
      sub_total: this.tempOrderData.subTotal,
      tax_amount: this.tempOrderData.Taxs,
      discount_amount: 1,
      total_amount: this.tempOrderData.paid,
      paid_amount: this.tempOrderData.paid,
      payment_type: 2,
      order_products:this.tempOrderData.order_products
    }
   
     
    

    if (this._getEncryptedData()) {
     
      this.orderService._addOrder(this.encUserAddID,this.encBillAddID, this.encStatus,this.encOrderStatus, body).subscribe((res) => {
        if (res) {
          console.log(res); 
          this.orderService._storeOrderDataLocal(res.data)
          this.router.navigate(['/'])
       }
      }, (error) => {
        console.log(error); 
     })
   }  
  }
  _getEncryptedData():boolean {
    // user add id 
    this.productService.encription(this.userAddID.toString()).subscribe((res) => {
      if (res) {
        this.encUserAddID = res.data;
        this.encBillAddID = res.data;
      }
    }, (error) => {
      console.log('enctiption fails');  
    })
// payment status
    this.productService.encription('2').subscribe((res) => {
      if (res.data) { 
        this.encStatus=res.data
      }
    }, (error) => {
      console.log('encription failds');  
    })
    this.productService.encription('3').subscribe((res) => {
      if (res) {
        this.encOrderStatus = res.data
      }
    }, (error) => {
      console.log('encription failds');
    })
    if (this.encUserAddID && this.encStatus) {
      return true
    } else {
      return false
    }
  }  

  
}
