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
    
export interface editCustomer {
    first_name: string,
    last_name: string,

    date_of_birth: Date,
    secondary_mobile_number: number,
    secondary_email: any
}
export interface Address{
    
        address_line_1: string,
        address_line_2: string,
        area: string,
        city:string,
        state: string
        country: string,
        postal_code: number,
        landmark: string,
        tag: string
    
}

export interface Changerpassword{
    oldPassword : any , 
    newPassword : any
}