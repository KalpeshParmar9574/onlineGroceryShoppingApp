import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Changerpassword, userRegForm } from 'src/app/Models/userForms.model';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  userDataForm!: FormGroup;
  flag : boolean=false;
  

  constructor(private fb: FormBuilder, private userService: UserServicesService) {
    this._initForm();
  }

  ngOnInit(): void {
    this._initForm()
  
   
  }
  
  _initForm() {
    this.userDataForm = this.fb.group({
      current_password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]),
      new_password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]),
      confirm_password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), ])
    });
  }
 
  _matchValues(control: AbstractControl): ValidationErrors | null {
    const newPass = this.userDataForm.get('new_password')?.value;
    const confirmPass = control.value;
    
    if (newPass !== confirmPass) {
      return { 'matchValues': true };
    }
    
    return null;
  }
  _changePassFormSubmit()  {

debugger
    const userData = this.userDataForm.getRawValue();
  
      const body: Changerpassword = {
        oldPassword : userData.current_password, 
        newPassword : userData.confirm_password
      }
    
    this.userService._changePass(body).subscribe((res) => {
      if (res) {
        alert("success")
      }
    }, (err) => {
      console.log(err);
      this.flag = true
      
      
    })
     
    
  }



  
  
}

