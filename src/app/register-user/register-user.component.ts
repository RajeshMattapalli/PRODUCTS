import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { RegisterUserService } from './register-user.service';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router, private RegisterUserService: RegisterUserService,
    private location: Location) { }

  appRegister = {};

  ngOnInit() {
  }

  registerUser(appRegister): void {
    this.RegisterUserService.register(appRegister).subscribe((response: any) => {
      if (response === "User Got Already Registered") {

      } else {
        console.log("response:" + response);
        this.router.navigate(["products"]);
      }
    });
  }

  cancelSignUP(): void {
    this.location.back();
  }

}
