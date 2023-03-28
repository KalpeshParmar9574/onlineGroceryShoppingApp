import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FrontModule } from '../app/modules/front/front.module';
import { CatalogModule } from '../app/modules/front/catalog/catalog.module';
import { UsersModule } from '../app/modules/front/users/users.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './layouts/home/home.component';

import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  
    
  ],
  exports: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FrontModule,
    CatalogModule,
    UsersModule,
    SharedModule,
    
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
