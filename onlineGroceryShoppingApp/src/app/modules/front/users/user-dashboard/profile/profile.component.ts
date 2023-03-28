import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userRegForm } from 'src/app/Models/userRegForm.model';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData!: any
  userDataForm!: FormGroup ;
  constructor(private fb :FormBuilder,private userService:UserServicesService){}
  ngOnInit() {
    this._getUserDataFromLocalStorage()
     // initilizing the form  
  }
  
  // this methos is initilized the form
  _initForm() {
    this.userDataForm = this.fb.group({
      firstName: new FormControl(this.userData[0].firstname, [Validators.required, Validators.min(2)]),
      lastName: new FormControl('', [Validators.required, Validators.min(2)]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required]),
   
    })
  }
  //this method is get the user stored data from the local storage
  _getUserDataFromLocalStorage() {
    debugger
    // code need to update used service for storing data in local storage 
    const data = this.userService._getLoggedInUserData();
    console.log(data);
    
    debugger
    if (data) {
      this.userData = JSON.parse(data);
      console.log(this.userData);
      this,this._initForm() // init the form
      this.userDataForm.setValue({
        firstName: this.userData[0].firstName||"",
        lastName:this.userData[0].lastName||"" ,
        dob:this.userData[0].DateOfBirth||"",
        email:this.userData[0].email||"",
        mobileNo: this.userData[0].mobileNo||"",
      })
    }
  }
  // this method is updating data in server and also in localstorage
  _updateUserData() {
     
  
    const userData = this.userDataForm.getRawValue();
    const body: userRegForm = {
 
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      DateOfBirth: userData.dob || Date,
      gender: this.userData[0].gender || "",
      address: this.userData[0].address||"",
      pincode: this.userData[0].pincode||"",
      city: this.userData[0].pincode||"",
      email: userData.email||"",
      mobileNo: userData.mobileNo||"",
      password:this.userData[0].password||"",
    }

 // data updating in local storage code here ...//
    
    this.userService._setLoggedInUserData(body);


    // this is called api for the updating the data in the server 
    this.userService._updateUserData(this.userData[0].id, body).subscribe((res) => {
      if (res) {
        alert("data updated successfuly")
      }
    }, (error:any) => {
      alert("something went wrong please try again")
      
    })
   
  }
}
// object data for the refrence 
// DateOfBirth
// : 
// "2023-03-04"
// address
// : 
// "NEAR ONGC KUWA AT BANEJDA"
// city
// : 
// "388580"
// email
// : 
// "kalpeshparmar9574@gmail.com"
// firstname
// : 
// "Kalpeshbhai"
// gender
// : 
// "option2"
// id
// : 
// 1
// lastname
// : 
// ""
// mobileNo
// : 
// "9537547435"
// password
// : 
// "kp1122001"
// pincode
// : 
// "388580"