import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { ManagaddressComponent } from './managaddress/managaddress.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LogoutComponent } from './logout/logout.component';
import { AddAddressComponent } from './add-address/add-address.component';

const routes: Routes = [
 
  {
    path: '',
    component: UserDashboardComponent,
    children: [
     
      { path: 'profile', component: ProfileComponent },
      { path: 'order', component: OrderComponent },
    
      { path: 'manageaddress', component: ManagaddressComponent },
      { path: 'addAdress', component: AddAddressComponent },
      { path: 'addAdress/:id', component: AddAddressComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      {path:'logout',component:LogoutComponent}
    ],
     
  }

    ]
  
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule{ }
