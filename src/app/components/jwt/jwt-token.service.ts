import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor() {
    let token = localStorage.getItem('jwt');
    if(token){
      this.jwtToken = token;
    }
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
    let role = this.getRole();
    if(role){
      localStorage.setItem('role', role)
    }
  }

  getToken() {
    return this.jwtToken;
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['role'] : null;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  getIssuedTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['iat'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * (+expiryTime) - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
