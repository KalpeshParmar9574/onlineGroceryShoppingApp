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

    window.scroll(0, 0)
    // below method is getting data from the server and store in prodData
    this.prodData = this.prodDataService.getSingleProduct(this.productID).subscribe((productData) => {
      this.prodData = productData;
      this.totalPrice = this.prodData.price;
      
    }, (error:any) => {
      alert("something went wring please try again later ",)
    })
    
   // getting user data from the localstorage 
    const uData = this.userService._getLoggedInUserData();
    if (uData) {
      this.userData = JSON.parse(uData);
      // this.userService.loginUser().subscribe((r) => {
      //   console.log(r,"user data from server ");
        
      // })
     
      
    } else {
      alert("please logged ")
    }

   
  }

  


  _gotoCart() {   // this is store the item data into cart object in the local storage and redirect user to the the cart page 
    debugger
    if (this.prodCount > 0) {
      const data: cartItem = {
        productID: this.prodData.id,
        userID: this.userData[0].id,
        ProdName:this.prodData.name,
        prodImg: this.prodData.image,
        prodQYT: this.prodCount,
        prodPrice:  this.prodData.price,
        prodTotalPrice:this.totalPrice*this.prodCount,
       
        category:this.prodData.category
      
      }
      console.log(data);
      
      
      this.cartService._storeItemInCart(data) // this method is called cartDataservice and store the item data into cart object in the localstorage 
      
      this.router.navigate(['./categories/cart'])  // this is naviagte use to the cart page 
    } else {
      alert("please enter quntity")
    }

 
  } 
  
  

}


