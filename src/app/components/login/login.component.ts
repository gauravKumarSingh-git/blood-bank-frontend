import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtTokenService } from '../jwt/jwt-token.service';
import { LocalStorageService } from '../jwt/local-storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JwtTokenService
  ) {}

  onSubmit(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(
      (responseData) => {
        this.localStorageService.set('jwt',responseData);
        let jwt = this.localStorageService.get('jwt');
        console.log(jwt);
        // if(jwt){
        //   console.log(this.jwtTokenService.isTokenExpired(jwt));
        //   console.log(this.jwtTokenService.getRole(jwt));
        //   console.log(this.jwtTokenService.getUser(jwt));
        // }
        if(this.errorMessage) this.errorMessage = '';
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = 'Invalid Credentials';
        } else {
          this.errorMessage = error.message;
          console.log(error);
        }
      }
    );
  }
}
