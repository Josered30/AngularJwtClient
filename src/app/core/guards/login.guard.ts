import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authentication: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  canActivate() {
    if (this.authentication.isLoggedIn()) {
      this.router.navigate(['/principal'], {relativeTo: this.route});
    }

    // true if is not authenticated, so the login module can be activated
    return !this.authentication.isLoggedIn();

  }
}



