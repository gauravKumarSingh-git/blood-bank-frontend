import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  constructor() {}

  getDecodeToken(token: string): any {
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }

  getUser(token: string) {
    return this.getDecodeToken(token)['sub'];
  }

  getRole(token: string){
    return this.getDecodeToken(token)['role'];
  }

  getIssuedTime(token: string) {
    return this.getDecodeToken(token)['iat'];

  }

  getExpiryTime(token: string) {
    return this.getDecodeToken(token)['exp'];

  }

  isTokenExpired(token: string): boolean {
    const expiryTime: number = this.getExpiryTime(token);
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
