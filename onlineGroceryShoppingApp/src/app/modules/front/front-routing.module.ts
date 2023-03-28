import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
   loadChildren:()=>import('./users/users.module').then((f)=>f.UsersModule)
  },
  {
    path: 'categories',
     loadChildren:()=>import('./catalog/catalog.module').then((c)=>c.CatalogModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
