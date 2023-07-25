import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{  
  hide = true;
  usernameFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  userDetailsFormGroup: FormGroup;

  ngOnInit(): void {
    
    this.usernameFormGroup = this._formBuilder.group({
      usernameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      roleCtrl: ['', Validators.required]
    });
  
    this.passwordFormGroup = this._formBuilder.group({
      pwdCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      confirmPwdCtrl: ['', [Validators.required, this.pwdCheck.bind(this)]]
    });
  
    this.userDetailsFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', [Validators.required, Validators.email]],
      genderCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required],
      dobCtrl: ['', [Validators.required]], 
      mnoCtrl: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
  
    })
  }

  pwdCheck(control: FormControl): {[s: string]: boolean} | null {
    if(control.value !== this.passwordFormGroup?.get('pwdCtrl')?.value && control.dirty){
      return {'passwordDoesNotMatch': true};
    }
    return null;
  }

  onUserDetailsSubmit(){
    console.log(this.userDetailsFormGroup);
  }
  constructor(private _formBuilder: FormBuilder) {}
  
}
