import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { HomeComponent } from 'src/app/layouts/home/home.component';
import { UserComponent } from './user/user.component';
import { UserAuthGuardService } from 'src/app/services/authGuards/user-auth-guard.service';
import { AuthInterceptorService } from 'src/app/services/interceptors/auth-interceptor.service';

const routes: Routes = [
 
  {

  
    path: '',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      // { path: 'profile', component: ProfileComponent },
      // {path:'order',component:OrdersComponent},
      {path:'user-dashboard', loadChildren:()=>import('../users/user-dashboard/user-dashboard.module').then((ud)=>ud.UserDashboardModule),canActivate:[UserAuthGuardService]},
      { path: '**', component: HomeComponent }

    ],
  
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
