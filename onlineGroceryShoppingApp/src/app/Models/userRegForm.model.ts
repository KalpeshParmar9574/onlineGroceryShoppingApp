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

export interface userRegServerForm
    {
        first_name: string,
        last_name: string,
        primary_mobile_number: number,
        primary_email: any,
        username:any,
        password: any,
    }

