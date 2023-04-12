import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartdataservicesService } from 'src/app/services/cartdataservices.service';

import { UserServicesService } from 'src/app/services/user-services.service';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent {
  title='My Cart'
  prodQYT!: number;
  cartData:any[] = [];
  currentUserCartData: any[] = [];

  noData: boolean = false
  userData!: any;
  subTotal!: any;
  Taxs!: number;
  totalCartAmount: number = 0;
  OrderData!: any;
  discount!:number

  constructor(private cartService:CartdataservicesService,private userService:UserServicesService,private router:Router) { }
 
  ngOnInit() {
    // get the user data from the local storage 
  this._getUserData()
    // get the cart data from the localstorage 
   this.getCartData()
    this._totalAmount()  
  }

  // get cart data 
  getCartData() { 
    const data = this.cartService._getStoreCartData()
    console.log();
    
    if (data) {
      this.cartData = JSON.parse(data);
      this.currentUserCartData= this.cartData.filter((item:any) => {
        if (item.userID == this.userData.addresses[0].customer_id) {
         return item
       }
      })  
     console.log(this.currentUserCartData);
     
    } else {
      this.noData = true
      console.log("no data ");  
    }
    this._totalAmount()
  }
  _addProd(pid: number) {
   
    this.cartData.forEach((product) => {
      if (product.product_id == pid && product.userID == this.userData.addresses[0].customer_id) {       product.qty++
        product.prodTotalPrice = product.qty * product.product_amount  
      }
    })
    this._totalAmount()
    
  }
  _removeProd(pid: number) {

    this.cartData.forEach((product) => {
      if (product.product_id == pid && product.userID == this.userData.addresses[0].customer_id && product.qty>1)   {
        product.qty--
        product.prodTotalPrice = product.qty * product.product_amount      
      }
    })
    
    this._totalAmount()
   
  }
  _totalAmount() {
    
    let total: number = 0;
    let discount: number = 0;
    this.currentUserCartData.forEach((item) => {
      discount+= item.discount_amount
      total+=item.prodTotalPrice
    })
    this.discount=discount
    this.subTotal = total;
    this.Taxs = this.subTotal * 0.05;
    this.totalCartAmount = this.subTotal + this.Taxs - this.discount
   
  
  }
  _deleteProduct(id: any) {
    for (let item = 0; item < this.cartData.length; item++){
      if (this.cartData[item].product_id == id && this.cartData[item].userID == this.userData.addresses[0].customer_id) { 
        this.cartData.splice(item, 1)
        this.cartService._updateCartData(this.cartData)
        
        this.getCartData()
       
      }
    }
  
  }
  

  
 
  _checkOut() {
    let removeFeilds=['userID','prodTotalPrice']
    let orderProducts = this.currentUserCartData.map(product => {
      const newProduct = { ...product }
      removeFeilds.forEach(field => {
        delete newProduct[field];
      });
      return newProduct;
    })
    console.log(orderProducts);
    
    const OrderData = { order_products: orderProducts, paid: this.totalCartAmount, subTotal: this.subTotal, Taxs: this.Taxs, };

    localStorage.setItem('tempOrderData',JSON.stringify(OrderData))
    this.router.navigate(['/categories/checkout'])

}
// user data methods
  _getUserData() { 
    const uData = sessionStorage.getItem('userData')
    if (uData) {
      this.userData = JSON.parse(uData);
    }
  }
}