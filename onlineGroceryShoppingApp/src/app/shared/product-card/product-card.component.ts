import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/Models/cartItem.model';
import { CartdataservicesService } from 'src/app/services/cartdataservices.service';

import { UserServicesService } from 'src/app/services/user-services.service';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  
  @Input() data !:any;
  storeCartData: any[] = [];
  userData!: any;
  constructor(private route: Router,private userService :UserServicesService,private cartService:CartdataservicesService, ) {

    
  }
  ngOnInit() {    
    this._getUserData()
  }
  onCardClick(id: any) {
    this.route.navigate(['./categories/product-details', id]);
    console.log(this.data);  
  }
  _addToCart(id: number, prodIDX: number) {
  
    console.log(this.data);
    console.log(prodIDX);
    if (this.userData) {
  
      const productData :cartItem ={
        product_id: this.data[prodIDX].id,
        product_name:this.data[prodIDX].title,
        qty: 1,
        product_amount: this.data[prodIDX].amount,
        discount_type: this.data[prodIDX].discount_type,
        discount_amount: this.data[prodIDX].discount_amount,
        userID: this.userData.addresses[0].customer_id,
        prodTotalPrice:this.data[prodIDX].amount
      }
       console.log(productData);
       this.cartService._storeItemInCart(productData)

    } else {
      alert('login is required')
    }
    
  }
  _getUserData() {
    const data = sessionStorage.getItem('userData')
    if (data) {
      this.userData = JSON.parse(data);
    }

    
 }
}
