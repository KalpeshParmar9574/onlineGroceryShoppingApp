import { Component } from '@angular/core';
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
  groupedProduct :any[]=[]
  noData: boolean = false
  userData!: any;
  subTotal!: any;
  deliveryCharge!: number;
  totalCartAmount: number = 0;
  OrderData!: any;

  constructor(private cartService:CartdataservicesService,private userService:UserServicesService) { }
 
  ngOnInit() {
    // get the user data from the local storage 
    const uData = this.userService._getLoggedInUserData();
    if (uData) {
      this.userData = JSON.parse(uData);
    }
    // get the cart data from the localstorage 
    const data = this.cartService._getStoreCartData()
    if (data) {
 
       this.cartData = JSON.parse(data);
     
      
      this.currentUserCartData= this.cartData.filter((item:any) => {
        if (item.userID == this.userData[0].id) {
         return item
       }
      })
 
      
  this._groping()
      
      
    } else {
      this.noData = true
      console.log("no data ");
      
    }
    this._totalAmount()

    
  }
  _addProd(pid: number) {
    debugger
    this.cartData.forEach((product) => {
      if (product.productID == pid && product.userID == this.userData[0].id) {
        product.prodQYT++
        product.prodTotalPrice = product.prodQYT*product.prodPrice        
      }
    })
    this._totalAmount()
    
  }
  _removeProd(pid: number) {

    this.cartData.forEach((product) => {
      if (product.productID == pid && product.userID == this.userData[0].id && product.prodQYT>0) {
        product.prodQYT--
        product.prodTotalPrice = product.prodQYT*product.prodPrice        
      }
    })
    
    
   
    this._totalAmount()
  }
  _totalAmount() {
    
    let total:number=0;
    this.currentUserCartData.forEach((item) => {
      total+=item.prodTotalPrice
    
    })
    this.subTotal = total;
    this.deliveryCharge = this.subTotal * 0.05;
    this.totalCartAmount = this.subTotal + this.deliveryCharge
   
  
  }
  _deleteProduct(id: any) {
    
    this.currentUserCartData = this.currentUserCartData.filter((product) => product.productID !== id);
    this._groping()
    this._totalAmount()
  }
  

  // operation on currenuserCartData for getting expected op
  _groping() {
   
    this.groupedProduct = this.currentUserCartData.reduce((acc, curr) => {
      const existing = acc.find((item:any) => item.category === curr.category);
      if (existing) {
        existing.products.push(curr);
      } else {
        acc.push({ category: curr.category, products: [curr] });
      }
      return acc;
    }, []);
   
  }
  
  _checkOut() {
  
    const OrderData = { ...this.currentUserCartData, totalOrderAmount: this.totalCartAmount };
    console.log(OrderData);
}

}