import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Login } from 'src/app/shared/models/dtos/output/Login';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userId: string;


  constructor(private authentication: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public login(email: HTMLInputElement, password: HTMLInputElement) {


    this.authentication.login({
      email: email.value,
      password: password.value
    })
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/principal']);
        }
      });

    return false;
  }



}
