import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtTokenService } from './components/jwt/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogin = new Subject<boolean>();
  private role = new Subject<string>();

  constructor(private jwtTokenService: JwtTokenService) { 
  }

  login() {
    this.isLogin.next(true);
    let res = this.jwtTokenService.getRole();
    if(res){
      this.role.next(res);
    }
  }

  logout() {
    this.isLogin.next(false);
    this.role.next('')
    localStorage.setItem('jwt', '');
    localStorage.setItem('role', '');
    localStorage.setItem('username', '');
  }

  isLoggedIn() {
    return this.isLogin;
  }

  getRole() {
    return this.role;
  }
}
