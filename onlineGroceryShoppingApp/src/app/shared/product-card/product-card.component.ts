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
  constructor(private route: Router,private userService :UserServicesService,private cartService:CartdataservicesService ) {
    
  }
  ngOnInit() {
    const data = this.userService._getLoggedInUserData();
    if (data) {
      this.userData = JSON.parse(data)
      console.log(this.userData[0].id);
      
    }
   
  }
  onCardClick(id:any) {
    this.route.navigate(['./categories/product-details', id]);
    console.log(this.data);
    
  }
  _addToCart(id: number, prodIDX: number) {
    if (this.userData) {
    console.log(this.data);
    
    
      
      const productData :cartItem ={
        


        productID: id,
        userID: this.userData[0].id,
        ProdName: this.data[prodIDX].name,
        prodImg:this.data[prodIDX].image,
        prodQYT:1,
        prodPrice: this.data[prodIDX].price,
        prodTotalPrice:this.data[prodIDX].price,
        category: this.data[prodIDX].category
        
        // userID: this.userData[0].id,
        // productID: id,
        
        // name: this.data[prodIDX].name,
        // description: this.data[prodIDX].description,
        // category: this.data[prodIDX].category,
        // price: this.data[prodIDX].price,
        // totalPrice:this.data[prodIDX].price ,
        // image: this.data[prodIDX].image,
        // prodQYT: 1,
        
  
      }
      this.cartService._storeItemInCart(productData);
      
    } else {
      alert('login is required')
    }
    
  }
  
}
