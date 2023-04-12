import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartdataservicesService } from 'src/app/services/cartdataservices.service';

import { ProductdataService } from 'src/app/services/productdata.service';

import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userData: any=null;
  userPresent: boolean = false;
  categories!: any[];
  cartData: any=null;

  constructor(
    private router: Router,
    private userService: UserServicesService,
    private productService: ProductdataService,
    private cartService: CartdataservicesService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this._getLoggedUserData();
    console.log(this.userPresent);
    if(this.userPresent){this._getCartData()}
    this._getAllCategories();

  }

  // this methods are redirect to the loggedin and registration pages as per they buttons are clicked
  //*********** */
  _navigate_login() {
    this.router.navigate(['./users/login']);
  }

  _navigate_reg() {
    this.router.navigate(['./users/register']);
  }

  // navigation for the user profile page order

  _navigate_profile() {
    debugger
    this.router.navigate(['./users/user-dashboard']);
  }

  _navigate_orders() {
    this.router.navigate(['./users/user-dashboard/order']);
  }

  _navigate_allCategories() {
    this.router.navigate(['./categories/category/all']);
  }

  _getLoggedUserData() {
    const token = this.cookieService.get('authToken');
    if (token) {
      let data = sessionStorage.getItem('userData');
      if (data) {
        this.userData = JSON.parse(data);
        this.userPresent = true; // Set userPresent to true when userData is retrieved from sessionStorage
      } else {
        this.userService._getUserDataFromServer().subscribe(
          (res) => {
            if (res) {
              this.userData = res.data;
              console.log(this.userData);
              sessionStorage.setItem('userData', JSON.stringify(this.userData));
              this.userPresent = true;
         
            }
          },
          (error) => {
            
            this.userPresent = false;
          }
        );
      }
    } else {
      this.userPresent = false;
    }
  }


  _logOut() {
    this.userService._logOutUser() // this method clear the user data from LS but it is for the json-server for real apis the method is define in the service use after when apis wroking 
    this.router.navigate(['home'])
  
  }
  //*********** */
  // products related methods
  // get all categories 
  _getAllCategories() { 

    this.productService._getAllCategories().subscribe((res) => { 
      if (res) { 
        this.categories=res.data
      }
    }, (error)=>{
      console.log(error);
      
    })
   
  }
  _searchProductWithCategory() {
  
  }
  
  _getCartData() {
    let uid = this.userData.addresses[0].customer_id
    if (uid) {
      this.cartData = this.cartService._getCartDataByUser(uid)
      console.log(this.cartData.length,"cartData");
      
    }
  }

 }
 
