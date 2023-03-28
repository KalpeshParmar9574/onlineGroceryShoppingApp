import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { ManagaddressComponent } from './managaddress/managaddress.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ProfileComponent,
    OrderComponent,
    ManagaddressComponent,
    ChangepasswordComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserDashboardRoutingModule
  ]
})
export class UserDashboardModule { }
