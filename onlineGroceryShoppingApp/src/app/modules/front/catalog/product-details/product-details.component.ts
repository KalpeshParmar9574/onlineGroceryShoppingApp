import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItem } from 'src/app/Models/cartItem.model';
import { CartdataservicesService } from 'src/app/services/cartdataservices.service';

import { ProductdataService } from 'src/app/services/productdata.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
name: any;

  
  
  prodData!: any;
  totalPrice!: number;
  prodCount: number = 1;
  cartDataObj!: any;
  cartData:any[]=[]
  productID!: any;
  userData!:any
  constructor(private prodDataService: ProductdataService, private route: ActivatedRoute, private router: Router,
  private cartService:CartdataservicesService, private userService:UserServicesService) { 
    this.productID = this.route.snapshot.paramMap.get('id'); // this is getting product id from the URL
   
  }
  ngOnInit(): void {
    this._getProdData()
    this._getUserData()
  }
  _getProdData() {
    this.prodDataService._getProductById(this.productID).subscribe((res) => {
      this.prodData = res.data
      console.log(this.prodData);
    }, (error) => {
      console.log(error);
      
  })
}
  
  _gotoCart() {   // this is store the item data into cart object in the local storage and redirect user to the the cart page 

    if (this.prodCount > 0) {
      const data: cartItem = {
        product_id: this.prodData.id,
        product_name:this.prodData.title,
        qty: this.prodCount,
        product_amount: this.prodData.amount,
        discount_type: this.prodData.discount_type,
        discount_amount:this.prodData.discount_amount,
        userID: this.userData.addresses[0].customer_id,
        prodTotalPrice:this.prodCount*this.prodData.amount
      
      }
      console.log(data);
      
      
      this.cartService._storeItemInCart(data) // this method is called cartDataservice and store the item data into cart object in the localstorage 
      
      this.router.navigate(['./categories/cart'])  // this is naviagte use to the cart page 
    } else {
      alert("please enter quntity")
    }

 
  } 
  
  _getUserData() {
    const data = sessionStorage.getItem('userData')
    if (data) {
      this.userData = JSON.parse(data);
    }

    
 }

}


