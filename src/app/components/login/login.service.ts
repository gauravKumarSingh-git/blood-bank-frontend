import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  jwtToken: string | undefined;
  error : HttpErrorResponse | undefined;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const postData = {username: username, password: password};
    this.http.post(
      'http://localhost:9090/user/authenticate',
      postData,
      {responseType: 'text'}
    )
    .subscribe(
      (responseData)=> {
        console.log(responseData);
        this.jwtToken = responseData;
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    )
  }
}
