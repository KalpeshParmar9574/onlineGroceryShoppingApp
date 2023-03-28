import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  
  @Input() data !:any;
  storeCartData: any[]=[];
  constructor(private route: Router, ) {
    
  }
  ngOnInit() {
   
  }
  onCardClick(id:any) {
    this.route.navigate(['./categories/product-details', id]);
    console.log(this.data);
    
  }
  _addToCart(id: any,prodIDX:any) {
    const productData = {
      userID: NaN,
      productID: id,
      
      name: this.data[prodIDX].name,
      description: this.data[prodIDX].description,
      category: this.data[prodIDX].category,
      price: this.data[prodIDX].price,
      totalPrice:this.data[prodIDX].price ,
      image: this.data[prodIDX].image,
      productQyt: 1,
      

    }
    console.log(productData);
    const cartCurrentData = localStorage.getItem('cartData')
    if (cartCurrentData) {
      const currentCart = JSON.parse(cartCurrentData);
      this.storeCartData = currentCart.concat(productData)
    } else {
      this.storeCartData = [productData]
    }

   localStorage.setItem('cartData',JSON.stringify(this.storeCartData))
   
    
  }
}
