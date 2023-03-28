import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 
  userData!: any;
  tempData!: any;
  constructor(private router: Router, private userService: UserServicesService) { }
  // this methods are redirect to the loggedin and registration pages as per they buttons are clicked
  //*********** */
  _navigate_login() {
    
    this.router.navigate(['./users/login',])
  }
  _navigate_reg() {
 
    this.router.navigate(['./users/register',])
  }

  // naviagtion for the user profile page order 

  _naviagte_profile() {
   
    this.router.navigate(['./users/user-dashboard',])
  }
  _naviagte_order() {

    this.router.navigate(['./users/order',])
  }
  //*********** */
  ngOnInit() {
   
    console.log("header is render ");
    
    
   
     this.tempData = this.userService._getLoggedInUserData()
    this.userData = JSON.parse(this.tempData)
    console.log(this.userData);
    
  }
  _logOut() {
    this.userService._logOutUser()
    this.router.navigate(['home'])
  }

 }
 
