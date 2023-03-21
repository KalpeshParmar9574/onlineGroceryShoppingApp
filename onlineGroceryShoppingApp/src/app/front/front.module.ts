import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FrontRoutingModule } from './front-routing.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AppRoutingModule
  ],
  exports: [
    UsersModule
    
  ]
})
export class FrontModule { }
