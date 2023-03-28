import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from '../catalog/product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { MycartComponent } from './mycart/mycart.component';
import { SharedModule } from 'src/app/shared/shared.module';

// import { ProductCartComponent } from './my-cart/product-cart.component';
// import {}

@NgModule({
  declarations: [
    CategoryComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCardComponent,
    MycartComponent,
 
   
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule
    
    
  ],
  exports: [
    ProductDetailsComponent,
    ProductListComponent,
    CategoryComponent,
    ProductCardComponent
  ]
})
export class CatalogModule { }
