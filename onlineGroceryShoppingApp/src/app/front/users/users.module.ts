import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule

  ],
  exports: [
    LoginComponent,
    ProfileComponent,
    RegistrationComponent
  ]
})
export class UsersModule { }
