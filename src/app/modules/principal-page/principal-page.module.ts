import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalPageRoutingModule } from './principal-page-routing.module';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';


@NgModule({
  declarations: [PrincipalPageComponent],
  imports: [
    CommonModule,
    PrincipalPageRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class PrincipalPageModule { }
