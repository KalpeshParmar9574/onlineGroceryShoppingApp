import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MycartComponent } from './mycart/mycart.component';
import { HomeComponent } from 'src/app/layouts/home/home.component';

// import { ProductCartComponent } from './my-cart/product-cart.component';

const routes: Routes = [
  {
    path: 'category/:type',
    component: CategoryComponent,
   
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
   
  },
  {
    path: 'cart',
    component:MycartComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
