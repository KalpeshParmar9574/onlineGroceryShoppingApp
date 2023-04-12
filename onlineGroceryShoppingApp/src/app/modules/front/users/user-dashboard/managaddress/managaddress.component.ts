import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-managaddress',
  templateUrl: './managaddress.component.html',
  styleUrls: ['./managaddress.component.scss']
})
export class ManagaddressComponent {
 
  currentUserAddData!: any;
 
  constructor(private userService:UserServicesService,private router : Router) { }
  

  ngOnInit() {
    this._getAdrress()
   }
  
  _getAdrress() {
    this.userService._getUserDataFromServer().subscribe((res) => {
      console.log(res);
      this.currentUserAddData = res.data.addresses;
     
   })
  }

  _deleteAdd(id:any) {
    this.userService._deleteAddress(id.toString()).subscribe((res) => {
      console.log(res);
      window.location.reload()
    }, (error) => {
      console.log(error);
      
    })
  }
  _updateAdd(id:any) {
    this.router.navigate(['./users/user-dashboard/addAdress',id])
  }
  }

  

