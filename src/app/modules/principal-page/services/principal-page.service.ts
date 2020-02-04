import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/app/shared/models/dtos/input/UserData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrincipalPageService {

  constructor(private http: HttpClient) { }
  public getData(): Promise<UserData> {
    return this.http.get<UserData>(environment.apiUrl + '/auth/profile').toPromise();
  }

}
