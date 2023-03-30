import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  title = "check out"
  userData!: any 
  constructor(private userService: UserServicesService) { }
  ngOnInit() {
    const data = this.userService._getLoggedInUserData()
    if (data) {
      this.userData=JSON.parse(data)
    }
    console.log(this.userData);
    
  }

  
}
