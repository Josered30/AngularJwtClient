import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Tokens } from 'src/app/shared/models/Tokens';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authentication: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authentication.getJwtToken()) {
      request = this.addToken(request, this.authentication.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {

      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'auth-token': `${token}`
      }
    });
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authentication.refreshToken().pipe(
        switchMap((response) => {
          const tokens: Tokens = {
            Token: response.headers.get('auth-token'),
            RefreshToken: response.headers.get('refresh-token')
          };

          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.Token);
          return next.handle(this.addToken(request, tokens.Token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
