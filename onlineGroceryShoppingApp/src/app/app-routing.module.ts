import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';

import { RegistrationComponent } from './modules/front/users/registration/registration.component';
import { CategoryComponent } from './modules/front/catalog/category/category.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'home'
  },
  {
    path: 'categories',
    loadChildren:()=>import('../app/modules/front/catalog/catalog.module').then((c)=>c.CatalogModule)
  },
  {
    path: 'users',
    loadChildren:()=>import('../app/modules/front/users/users.module').then((u)=>u.UsersModule)
  },
 
  
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'home/:id',
    component:HomeComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


