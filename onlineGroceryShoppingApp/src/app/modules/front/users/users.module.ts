import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';

import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserComponent,
 
   
  ],
  imports: [
    CommonModule,
   
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule
   

  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class UsersModule { }
