import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { FrontRoutingModule } from './front-routing.module';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FrontRoutingModule,
    AppRoutingModule
  ],
  exports: [
    UsersModule,
    CatalogModule
    
  ]
})
export class FrontModule { }
