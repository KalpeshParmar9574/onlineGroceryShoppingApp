import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductdataService } from 'src/app/services/productdata.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prodData!: any;
  totalPrice!: number;
  prodCount: number = 1;
  cartDataObj!: any;
  cartData:any[]=[]
  productID!: any;
  constructor(private prodDataService: ProductdataService, private route: ActivatedRoute, private router: Router) { 
    this.productID = this.route.snapshot.paramMap.get('id');
   
  }
  ngOnInit(): void {

    window.scroll(0,0)
    this.prodData = this.prodDataService.getSingleProduct(this.productID).subscribe((productData) => {
      this.prodData = productData;
      this.totalPrice = this.prodData.price;
      
    }, (error) => {
      alert("something went wring please try again later ",)
    })
    
    
   
  }

  _addProduct() {
    
    this.prodCount++
    this.calculatePrice(this.prodCount);
  }

  _removeProduct() {
    if (this.prodCount > 0) {
      this.prodCount--
    }
    this.calculatePrice(this.prodCount);
  }

  calculatePrice(prodCount:number) {
    this.totalPrice = prodCount * this.prodData.price
  
    this.cartDataObj = {
      userID: NaN,
      id: this.prodData.id,
      name: this.prodData.name,
      description: this.prodData.description,
      category: this.prodData.category,
      price: this.prodData.price,
      totalPrice:this.totalPrice ,
      image: this.prodData.image
   }
    console.log(this.cartDataObj);
    
  }

  _gotoCart() {
    debugger
    
    this.router.navigate(['./categories/cart'])
  }
  
  

}


