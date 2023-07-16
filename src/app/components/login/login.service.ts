import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenService } from '../jwt/jwt-token.service';
import { LocalStorageService } from '../jwt/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const postData = { username: username, password: password };
    return this.http.post('http://localhost:9090/user/authenticate', postData, {
      responseType: 'text',
    });
  }
}
