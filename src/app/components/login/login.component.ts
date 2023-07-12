import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private http: HttpClient) {}

  onSubmit(form: NgForm){
    console.log(form.value);
    this.loginService.login(form.value.username, form.value.password);
  }

}
