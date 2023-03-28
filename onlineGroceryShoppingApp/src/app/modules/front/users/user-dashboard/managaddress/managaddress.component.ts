import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-managaddress',
  templateUrl: './managaddress.component.html',
  styleUrls: ['./managaddress.component.scss']
})
export class ManagaddressComponent {
  userDataForm!: FormGroup;
  currenUserData!: any;
  constructor(private userService: UserServicesService, private fb: FormBuilder) { }
  

  ngOnInit() {
    this._initForm()
    const data = this.userService._getLoggedInUserData();
    if (data) {
      this.currenUserData = JSON.parse(data);
      this.userDataForm.setValue({
        address:this.currenUserData[0].address||''
      })
    }

  }

  _initForm(){
    this.userDataForm = this.fb.group({
      address: new FormControl('', [Validators.required]),
  })
  }
  
}
