export interface userRegForm{
    id?: any,
    firstName: string,
    lastName: string,
    DateOfBirth: Date,
    gender: string,
    address: string,
    pincode: number,
    city: string,
    email: any,
    mobileNo: number,
    password:any

}

// firstName: new FormControl('', [Validators.required, Validators.min(2)]),
// lastName: new FormControl('', [Validators.required, Validators.min(2)]),
// dob: new FormControl('', [Validators.required]),
// // gender: new FormControl('', [Validators.required,]),
// address: new FormControl('', [Validators.required]),
// pincode: new FormControl('', [Validators.required, Validators.min(6)]),
// state: new FormControl('', [Validators.required]),
// city: new FormControl('', [Validators.required]),
// email: new FormControl('', [Validators.required, Validators.email]),
// mobileNo: new FormControl('', [Validators.required]),
// password:new FormControl('',Validators.required,)