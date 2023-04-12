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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './layouts/home/home.component';
import { UserAuthGuardService } from './services/authGuards/user-auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
import { UserServicesService } from './services/user-services.service';
import { CarouselModule } from 'ngx-owl-carousel-o';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    CarouselModule,
    IvyCarouselModule,
    BrowserAnimationsModule,
     
    

    
  ],
 
  providers: [UserServicesService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},UserAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
