import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from 'src/app/services/user-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userServerData!: any;
  loginSuccess: boolean=false;

  constructor(private fb: FormBuilder, private userServices: UserServicesService, private router: Router
  , private userService:UserServicesService) {
    //
    this.initLoginForm();
   }
// this method is initilized the logged in form
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }
  ngOnInit() {
    window.scroll(0,0)
  }
  // this method is take the inputs from the logged in form and verify it with data which is come form the server 
  loginUser() {
    const userData = this.loginForm.getRawValue();
   // this is service which is called api for the data
    this.userServices.loginUser().subscribe((res) => {
    
      console.log(res);
      debugger
      res.forEach((user:any) => {
        if (user.email == userData.email&& user.password == userData.password) {
          this.router.navigate(['/home'])
          this._setLoggedInUserDataInService(user)
          console.log("sucess");
          
        } else {
 // this flag for displaying the error that email id or password is not macth with the entered data 
          this.loginSuccess = true;
        }
        
      });  
    }, (error: any) => {
      // this is diplaying an error if the server is not responding 
      console.log("error", error);
      alert("something went worng please try again later")
    })        
  }
  
  _setLoggedInUserDataInService(user:any) {
    this.userService._setLoggedInUserData(user);
  }
}

