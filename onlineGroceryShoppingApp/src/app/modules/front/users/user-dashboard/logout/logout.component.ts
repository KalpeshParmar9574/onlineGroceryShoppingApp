import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  userData!: any
  userName!:string
  constructor(private userService: UserServicesService, private router : Router) {
    const data = this.userService._getLoggedInUserData();
    if (data) {
      this.userData = JSON.parse(data);
      this.userName= this.userData[0].firstName;
    }
    
  }
  _logOut() {
    // this.userService._logOutUser()
    // this.router.navigate(['home'])
  }

}
