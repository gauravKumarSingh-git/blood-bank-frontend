import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {  

  usernameFormGroup = this._formBuilder.group({
    usernameCtrl: ['', Validators.required],
    roleCtrl: ['', Validators.required]
  });

  passwordFormGroup = this._formBuilder.group({
    pwdCtrl: ['', Validators.required],
    confirmPwdCtrl: ['', Validators.required]
  });

  userDetailsFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', [Validators.required, Validators.email]],
    genderCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
    mnoCtrl: ['', Validators.required],

  })

  constructor(private _formBuilder: FormBuilder) {}
}
