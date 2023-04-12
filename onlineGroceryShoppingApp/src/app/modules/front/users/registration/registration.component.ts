import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {  userRegServerForm } from 'src/app/Models/userForms.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regForm!:FormGroup;
  constructor(private fb: FormBuilder , private router :Router,private userAuthService:UserAuthService) {
    this.initRegForm()
  }
// initilzed the registration form 
  initRegForm() {
    
  this.regForm = this.fb.group({
    firstName: new FormControl('', [Validators.required, Validators.min(2)]),
    lastName: new FormControl('', [Validators.required, Validators.min(2)]),

    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
   userName: new FormControl('',[Validators.required])
  })
  
}


  _regFormSubmit() {

    const userData = this.regForm.getRawValue(); // get the values from the userData form 


    const body: userRegServerForm = {
      first_name: userData.firstName ,
        last_name:userData.lastName,
        primary_mobile_number: userData.mobileNo,
        primary_email:  userData.email,
        username:userData.userName,
        password:userData.password,
    }
    console.log(body);
    debugger
    this.userAuthService._userRegister(body).subscribe((res) => {  // calling the service for registration
      if (res) {
        alert("register successfully")
        this.router.navigate(['/home'],)
      }
      
    },(error) => {
      console.log("error", error);
      alert("something went worng please try again later") // if there is any error in server response alert is show
      
    })
    

  }

}

