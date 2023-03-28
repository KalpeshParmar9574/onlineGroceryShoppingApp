import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { userRegForm } from 'src/app/Models/userRegForm.model';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regForm!:FormGroup;
  constructor(private fb: FormBuilder , private regService:UserServicesService,private router :Router) {
    this.initRegForm()
  }
// initilzed the registration form 
  initRegForm() {
    
  this.regForm = this.fb.group({
    firstName: new FormControl('', [Validators.required, Validators.min(2)]),
    lastName: new FormControl('', [Validators.required, Validators.min(2)]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required,]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.min(6)]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNo: new FormControl('', [Validators.required]),
   password:new FormControl('',Validators.required,)
  })
  
}


  _regFormSubmit() {

    const userData = this.regForm.getRawValue(); // get the values from the userData form 
    const body: userRegForm = {
 
      firstName: userData.firstName ||"",
      lastName: userData.lastName ||"",
      DateOfBirth: userData.dob ||Date,
      gender: userData.gender||"",
      address: userData.address||"",
      pincode: userData.pincode||"",
      city: userData.pincode||"",
      email: userData.email||"",
      mobileNo: userData.mobileNo||"",
      password:userData.password||"",
  

    }
    console.log(body);
    
    this.regService.registerUser(body).subscribe((res) => {  // calling the service for adding new user in json serverbol
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

