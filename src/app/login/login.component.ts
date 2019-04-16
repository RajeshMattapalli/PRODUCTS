import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';
import { EncrDecrService } from '../sharedServices/encr-decr.service';
import { AlertsService } from '../alerts/alerts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = "LOGIN";
  applogin: object = {};
  isLoadingResults: boolean = false;

  constructor(private router: Router, private loginService: LoginService,
    private EncrDecrService: EncrDecrService, private alertService: AlertsService) { }

  ngOnInit() {
  }

  login(applogin): void {
    this.isLoadingResults = true;
    applogin.password = this.EncrDecrService.set('123456$#@$^@1ERF', applogin.password);
    if (applogin.rememberMe) {
      localStorage.setItem('userName', applogin.userName);
    }
    this.loginService.login(applogin).subscribe((response: any) => {
      // if (response.message === "User Exists") {
      if (response.token) {
        localStorage.setItem('access_token', response.token);
        this.isLoadingResults = false;
        this.router.navigate(["products"]);
        return true;
      } else if (response.message === "Password Doesn't Match") {
        this.isLoadingResults = false;
        // this.applogin.password.value = '';
        this.alertService.error("Password Doesn't Match");
        // alert("Password Doesn't Match");
      }
      else {
        this.isLoadingResults = false;
        this.alertService.error("Invalid Credentials");
        // alert("Invalid credentials");
      }
    });
  }

  private reset(): void {
    this.applogin = {
      userName: '',
      password: ''
    }
  }

  signUp(): void {
    this.router.navigate(["signUp"]);
  }

}
