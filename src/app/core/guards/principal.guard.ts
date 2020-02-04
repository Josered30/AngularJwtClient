import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard implements CanActivate, CanLoad {

  constructor(private authorization: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  canActivate() {
    return this.canLoad();
  }
  canLoad() {
    if (!this.authorization.isLoggedIn()) {
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
    return true;
  }
}
