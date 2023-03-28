import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { userRegForm } from 'src/app/Models/userRegForm.model';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  userDataForm!: FormGroup;
  currenUserData!: any;
  cpass!: any;
  currentData!: any;
  flag : boolean=true;
  

  constructor(private fb: FormBuilder, private userService: UserServicesService) {
    this._initForm();
  }

  ngOnInit(): void {
    const data = this.userService._getLoggedInUserData();
  
    if (data) {
      this.currenUserData = JSON.parse(data);
      this.cpass = this.currenUserData[0].password;
    }
  }
  
  _initForm() {
    this.userDataForm = this.fb.group({
      current_password: new FormControl('', [Validators.required,this.currentPasswords.bind(this)]),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', [Validators.required,this.matchPasswords.bind(this)])
    });
  }
  _changePassFormSubmit()  {


    const userData = this.userDataForm.getRawValue();
  
      const body: userRegForm = {
 
        firstName: this.currenUserData[0].firstName || "",
        lastName: this.currenUserData[0].lastName || "",
        DateOfBirth: this.currenUserData[0].DateOfBirth || Date,
        gender: this.currenUserData[0].gender || "",
        address: this.currenUserData[0].address || "",
        pincode: this.currenUserData[0].pincode || "",
        city: this.currenUserData[0].city || "",
        email: this.currenUserData[0].email || "",
        mobileNo: this.currenUserData[0].mobileNo || "",
        password: userData.new_password || "",
    
  
      }
  
      this.userService._setLoggedInUserData(body); // setting updated password in local storage 
      this.userService._updateUserData(this.currenUserData[0].id, body).subscribe((res) => {
        if (res) {
          alert("password updated successfully")
        }
      }, (error: any) => {
        alert("something went wrong please try again later ",)
        console.log(error);
        
      });
      return this.flag
     
  

    // _checkCurrentPass(control: AbstractControl): ValidationErrors | null {
    //   if (control.value !== this.cpass) {
    //     return null;
    //   } else {
    //     return { _checkCurrentPass: true };
    //   }
    // }


  }

  
  matchPasswords(control: AbstractControl): ValidationErrors | null {
    const new_password = control.root.get('new_password') as FormControl;
    return (new_password !== control.value  ) ? {matchPasswords: true} : null;
  }
  currentPasswords(control: AbstractControl): ValidationErrors | null {
    debugger
   
    return (this.cpass !== control.value  ) ? {matchPasswords: true} : null;
  }
  
  
}

