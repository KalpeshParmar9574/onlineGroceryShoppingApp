import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/Models/userForms.model';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  addForm!: FormGroup;
  addID!: any;
  userAdd!: Address;
  btnTxt:string='save';

  constructor(private fb: FormBuilder, private userService: UserServicesService,private route:ActivatedRoute) { 
    this.addID = this.route.snapshot.paramMap.get('id');
    if (this.addID) {
      this.btnTxt='update'
    }
  }

  ngOnInit() {
    this._intiForm();
    this._setDataFeilds();
  }

  _intiForm() {
    this.addForm = this.fb.group({
      addressL1: new FormControl('', [Validators.required]),
      addressL2: new FormControl('',),
      landMark: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      pin: new FormControl('', [Validators.required, Validators.minLength(6)]),
      city: new FormControl('', Validators.required),
      state: new FormControl('0', Validators.required),
      country: new FormControl('0', Validators.required),
      tag: new FormControl('', Validators.required),    
    });
  }

  _setDataFeilds() {
    debugger
    this.userService._getUserDataFromServer().subscribe((res) => {
      if (res) {
        this.userAdd = res.data.addresses.find((add:any) => {
          if (add.id == this.addID) {
            return add;
          }
        });

        // Set values to the form controls
        this.addForm.patchValue({
          addressL1: this.userAdd.address_line_1,
          addressL2: this.userAdd.address_line_2,
          landMark: this.userAdd.landmark,
          area: this.userAdd.area,
          pin: this.userAdd.postal_code,
          city: this.userAdd.city,
          state: this.userAdd.state,
          country: this.userAdd.country,
          tag: this.userAdd.tag
        });
      }
    }, (error) => {
      console.log(error);  
    });
  }

  _addAddress() {
    // Get the form data and send it to the server
    const data = this.addForm.getRawValue();
    const body: Address={
      address_line_1: data.addressL1,
      address_line_2: data.addressL2,
      area: data.area,
      city:data.city,
      state: data.state,
      country: data.country,
      postal_code: data.pin,
      landmark: data.landMark,
      tag: data.tag
    }
    if (!this.addID) {

      this.userService._addAddress(body).subscribe((res) => {
        if (res) {
          console.log("success");
          alert("Address added successfully");
        }
      }, (err) => {
        console.log(err);
      });
    } else {
      
      console.log(body);
      
      this.userService._updateAddress(this.addID.toString(), body).subscribe((res) => {
        if (res) {
          console.log(res);
          
         }
      }, (error) => {
        console.log(error);
        
    })
}
  }


}
