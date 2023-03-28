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
  currentUserData!: any;
  editMode = false;
  constructor(private userService: UserServicesService, private fb: FormBuilder) { }
  

  ngOnInit() {
    this._initForm()
    const data = this.userService._getLoggedInUserData();
    if (data) {
      this.currentUserData = JSON.parse(data);
      this.userDataForm.setValue({
        address:this.currentUserData[0].address||''
      })
    }

  }

  _initForm(){
    this.userDataForm = this.fb.group({
      address: new FormControl('', [Validators.required]),
      
    }); this.userDataForm.controls['address'].disable();
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.userDataForm.controls['address'].enable();
    } else {
      this.userDataForm.controls['address'].disable();
    }
  }
}
