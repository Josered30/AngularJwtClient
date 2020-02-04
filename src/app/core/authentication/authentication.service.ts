import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Tokens } from 'src/app/shared/models/Tokens';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/shared/models/dtos/output/Login';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { UserData } from 'src/app/shared/models/dtos/input/UserData';
import { Refresh } from 'src/app/shared/models/dtos/output/Refresh';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_ID = 'USER_ID';
  userId: string;

  constructor(private http: HttpClient) { }

  public login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { loginData }, { observe: 'response' })
      .pipe(
        tap((response) => {
          const tokens: Tokens = {
            Token: response.headers.get('auth-token'),
            RefreshToken: response.headers.get('refresh-token')
          };
          this.doLoginUser(response.body.id, tokens);
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public refreshToken() {

    const refresh: Refresh = {
      jwtToken: localStorage.getItem(this.JWT_TOKEN),
      refreshToken: localStorage.getItem(this.REFRESH_TOKEN),
      userId: localStorage.getItem(this.USER_ID),
    };

    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, { refresh }, { observe: 'response' })
      .pipe(tap((response) => {
        const tokens: Tokens = {
          Token: response.headers.get('auth-token'),
          RefreshToken: response.headers.get('refresh-token')
        };
        this.storeTokens(tokens);
      }));
  }

  public logout() {
    this.doLogoutUser();
  }

  private doLoginUser(userId: string, tokens: Tokens) {
    this.userId = userId;
    localStorage.setItem(this.USER_ID, userId);

    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.userId = null;
    localStorage.removeItem(this.USER_ID);

    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.Token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.RefreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }



}
