import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../shared/user.model';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { AppConstants } from 'src/app/constants/app.constants';
import { SnackbarService } from '../shared/snackbar.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  hide = true;
  maxDate = moment(new Date()).subtract(8, 'years').format('YYYY-MM-DD')
  minDate = moment(new Date()).subtract(120, 'years').format('YYYY-MM-DD')
  usernameFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  userDetailsFormGroup: FormGroup;
  user: User = {
    userId: '',
    username: '',
    password: '',
    email: '',
    state: '',
    city: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    role: '',
    requests: []
  };

  ngOnInit(): void {
    this.usernameFormGroup = this._formBuilder.group({
      usernameCtrl: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9]+$')
        ],
      ],
      roleCtrl: ['', Validators.required],
    });

    this.passwordFormGroup = this._formBuilder.group({
      pwdCtrl: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$')
        ],
      ],
      confirmPwdCtrl: ['', [Validators.required, this.pwdCheck.bind(this)]],
    });

    this.userDetailsFormGroup = this._formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]],
      emailCtrl: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      genderCtrl: [''],
      cityCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]],
      stateCtrl: ['', Validators.required],
      addressCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.maxLength(30)]],
      dobCtrl: [''],
      mnoCtrl: [
        '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
    });
  }

  pwdCheck(control: FormControl): { [s: string]: boolean } | null {
    if (
      control.value !== this.passwordFormGroup?.get('pwdCtrl')?.value &&
      control.dirty
    ) {
      return { passwordDoesNotMatch: true };
    }
    return null;
  }

  onUserDetailsSubmit() {
    console.log(this.userDetailsFormGroup);
  }

  onSignupSubmit() {
    
    this.user.username = this.usernameFormGroup.get('usernameCtrl')?.value;
    this.user.role = this.usernameFormGroup.get('roleCtrl')?.value;
    this.user.password = this.passwordFormGroup.get('pwdCtrl')?.value;
    this.user.email = this.userDetailsFormGroup.get('emailCtrl')?.value;
    this.user.gender = this.userDetailsFormGroup.get('genderCtrl')?.value;
    this.user.state = this.userDetailsFormGroup.get('stateCtrl')?.value;
    this.user.city = this.userDetailsFormGroup.get('cityCtrl')?.value;
    this.user.address = this.userDetailsFormGroup.get('addressCtrl')?.value;
    let formDate = this.userDetailsFormGroup.get('dobCtrl')?.value;
    if(formDate){
      let date = Date.parse(this.userDetailsFormGroup.get('dobCtrl')?.value);
      let formattedDate = moment(date).format('YYYY-MM-DD')
      this.user.dateOfBirth = formattedDate;
    }
    this.user.phoneNumber = this.userDetailsFormGroup.get('mnoCtrl')?.value;

    console.log(this.user);

    this.http.post(`${environment.rooturl}${AppConstants.USER_API_URL}/registerUser`, 
      this.user,
      {responseType: 'text'}
    ).subscribe(
      (response) => {
        console.log(response);
        this.snacbarService.showSnackbarMessage(response);
      },
      (error) => {
        console.log(error);
        let errorMessage = JSON.parse(error.error).errorMessage;
        this.snacbarService.showSnackbarMessage(errorMessage);
      }
    )

  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private snacbarService: SnackbarService) {}
}
