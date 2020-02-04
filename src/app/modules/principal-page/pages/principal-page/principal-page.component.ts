import { Component, OnInit } from '@angular/core';
import { PrincipalPageService } from '../../services/principal-page.service';
import { UserData } from 'src/app/shared/models/dtos/input/UserData';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent implements OnInit {

  public user: UserData;
  constructor(private principalService: PrincipalPageService, private authentication: AuthenticationService, private route: Router) { }

  async ngOnInit() {
    this.user = await this.principalService.getData();

  }

  logout() {
    this.authentication.logout();
    this.route.navigate(['/']);
  }

}
