import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  wrongCredentials : boolean = false;
  loggedOut : boolean = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  login(){
    this.wrongCredentials = false;
    this.authService.login(this.username, this.password).then(() => {
      if (this.authService.isLoggedIn()){
        console.log("Prisijungta");
      }else{
        this.wrongCredentials = true;
      }
    });
  }

  logout(){
    this.loggedOut = false;
    if (this.authService.isLoggedIn()){
      this.loggedOut = true;
      this.authService.logout();
    }
    
  }


}
