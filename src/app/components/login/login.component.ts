import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
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
    private localStorageService: LocalStorageService,
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(
      (responseData) => {
        // console.log(responseData);
        this.localStorageService.set('jwt',responseData);
        this.jwtTokenService.setToken(responseData);
        localStorage.setItem('username', form.value.username);
        this.authService.login();
        let role = this.jwtTokenService.getRole();
        if(role === 'ROLE_DONOR'){
          this.router.navigate(['/donor']);
        }
        if(role === 'ROLE_HOSPITAL'){
          this.router.navigate(['/hospital']);
        }
        if(role === 'ROLE_ADMIN'){
          this.router.navigate(['/admin']);
        }

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
