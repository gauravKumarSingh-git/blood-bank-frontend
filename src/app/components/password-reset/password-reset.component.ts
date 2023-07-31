import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { SnackbarService } from '../shared/snackbar.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent {
  isOtpSent = false;
  sending = false;
  username = '';
  successMessage = '';
  otpVerified = false;
  passwordMatch = true;
  passwordUpdated = false;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  onUsernameSubmit(form: NgForm) {
    // console.log(form.value)
    this.sending = true;
    this.http
      .post(
        environment.rooturl +
          AppConstants.EMAIL_API_URL +
          '/send/' +
          form.value['username'],
        null,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.successMessage = response;
          this.isOtpSent = true;
          this.sending = false;
          this.username = form.value['username'];
        },
        (error) => {
          this.isOtpSent = false;
          this.sending = false;
          console.log(error);
          this.snackbarService.showSnackbarMessage('Username not found');
        }
      );
  }

  otpSubmit(form: NgForm) {
    this.http
      .get(
        environment.rooturl +
          AppConstants.EMAIL_API_URL +
          '/verifyOtp/' +
          this.username +
          '/' +
          form.value['otp']
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.snackbarService.showSnackbarMessage(
              'Successfully Verified OTP'
            );
            this.otpVerified = true;
          } else {
            this.snackbarService.showSnackbarMessage('Invalid OTP');
          }
        },
        (error) => console.log(error)
      );
  }

  passwordSubmit(form: NgForm) {
    if (form.value['password'] !== form.value['confirmpass']) {
      this.passwordMatch = false;
      return;
    }
    this.passwordMatch = true;
    this.http.put(
      environment.rooturl +
        AppConstants.USER_API_URL +
        '/updatePassword/' +
        this.username +
        '/' +
        form.value['password'],
      null,
      { responseType: 'text' }
    ).subscribe(
      (response) => {
        console.log(response);
        this.passwordUpdated=true;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
