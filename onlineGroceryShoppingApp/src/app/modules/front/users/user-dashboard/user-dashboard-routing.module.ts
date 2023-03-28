import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { ManagaddressComponent } from './managaddress/managaddress.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
 
  {
    path: '',
    component: UserDashboardComponent,
    children: [
     
      { path: 'profile', component: ProfileComponent },
      { path: 'order', component: OrderComponent },
      { path: 'address', component: ManagaddressComponent },
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
