import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';


const routes: Routes = [
  {
    path: '',
    component: PrincipalPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalPageRoutingModule { }
