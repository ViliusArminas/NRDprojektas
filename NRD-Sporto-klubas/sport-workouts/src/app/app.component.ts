import { Component } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService : AuthService) {}

    logout(){
    if (this.authService.isLoggedIn()){
      this.authService.logout();
      
    }
  }
  
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
