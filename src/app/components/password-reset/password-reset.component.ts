import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { ToastService } from '../shared/toast/toast.service';

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
    private toastService: ToastService,
    private route: Router
  ) {}

  onUsernameSubmit(form: NgForm) {
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
          this.toastService.show(JSON.parse(error.error).errorMessage, { classname: 'bg-danger text-light', delay: 3000 });
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
            this.toastService.show('Successfully Verified OTP', { classname: 'bg-success text-light', delay: 3000 });
            this.otpVerified = true;
          } else {
            this.toastService.show('Invalid OTP', { classname: 'bg-danger text-light', delay: 3000 });
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
        this.passwordUpdated=true;
        this.toastService.show('Password Successfully Updated', { classname: 'bg-success text-light', delay: 2000 });
        setTimeout(() => {
          this.route.navigate(['/login'])
        }, 2010);
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.errorMessage, { classname: 'bg-danger text-light', delay: 3000 });
      }
    )
  }
}
