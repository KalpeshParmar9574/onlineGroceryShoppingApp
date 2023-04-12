import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CookieService } from 'ngx-cookie-service';


import { UserServicesService } from 'src/app/services/user-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  userServerData!: any;
  loginFail: boolean = false;
  errorMSG!: string;

  constructor(private fb: FormBuilder, private router: Router
  , private userAuthService:UserAuthService,private cookieService: CookieService ) {
    //
    this.initLoginForm();
   }
// this method is initilized the logged in form
initLoginForm() {
  this.loginForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 
    ])
  });
}

  ngOnInit() {
    window.scroll(0,0)
  }
  // login method for the logged in user  sends the data on server if the data is valid then store the auth token in local storage  which is get from the server  
  _loginUser() {
    debugger
    const userData = this.loginForm.getRawValue();
   // this is service which is called api for the data
    const body = {
      username: userData.username,
      password: userData.password
    }
    this.userAuthService._userLogin(body).subscribe((res) => {
      if (res) {
        alert("login successfull")
        let token = res.data.token;
        console.log("token:", token);
        const expirationTime = 24 * 60 * 60; // 24 hours in seconds
        this.cookieService.set('authToken', token, expirationTime, '/');
        this.router.navigate(['/home'])
      }  
 
    }, (error: any) => {
      if (error.status == 400) {
        this.loginFail = true;
        this.errorMSG = error.data.error;
      }
      this.loginFail = true;
    })        
  }
  
}


