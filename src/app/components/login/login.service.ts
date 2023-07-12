import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const postData = {username: username, password: password};
    this.http.post(
      'http://localhost:9090/user/authenticate',
      postData
    )
    .subscribe(
      (responseData)=> {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
