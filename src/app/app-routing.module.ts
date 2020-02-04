import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { PrincipalGuard } from './core/guards/principal.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'principal',
    loadChildren: './modules/principal-page/principal-page.module#PrincipalPageModule',
    canActivate: [PrincipalGuard],
    canLoad: [PrincipalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
