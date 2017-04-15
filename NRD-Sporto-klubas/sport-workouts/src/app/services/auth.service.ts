import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams} from '@angular/http';
import {tokenIsPresent} from 'ng2-bearer';

@Injectable()
export class AuthService {

  constructor(private http : Http) { }

  login(username : string, password : string): Promise<void>{
    var headers = new Headers();
    var body = new URLSearchParams();

    body.set('Content-Type', 'application/x-www-form-urlencoded');
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    return this.http.post('http://localhost:49974/api/Token', body, {headers : headers})
    .toPromise()
    .then(token => {
      localStorage.setItem('access_token', token.json().access_token);
    }).catch(err => {
      console.log("Wrong credentials");
    });
  }

  isLoggedIn(){
    return tokenIsPresent();
  }

  logout(){
    localStorage.removeItem('access_token');
  }


}
