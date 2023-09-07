import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const postData = { username: username, password: password };
    return this.http.post(environment.rooturl + AppConstants.USER_API_URL + '/authenticate', postData, {
      responseType: 'text',
    });
  }
}
