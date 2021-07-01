import { User } from './../../model/user';
import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;
  constructor(private fb: FormBuilder, private userService: UserServiceService) {

  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validator: ConfirmedValidator('password', 'confirmPassword') })
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('Mark', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, { validator: ConfirmedValidator('password', 'confirmPassword')})
  }

  // passwordMatchingValidator(): ValidatorFn{
  //   return (FormGroup: FormGroup): ValidationErrors | null =>{
  //     return this.registrationForm.get('password')?.value === this.registrationForm.get('confirmPassword')?.value ? null :
  //   { notmatched: true };
  //   }


  // }

  get userName(){
    return this. registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this. registrationForm.get('email') as FormControl;
  }

  get password(){
    return this. registrationForm.get('password') as FormControl;
  }

  get mobile(){
    return this. registrationForm.get('mobile') as FormControl;
  }

  ValidateControl(control:FormControl) : boolean
  {
    return !control.valid && (control.touched || this.userSubmitted)
  }

  OnSubmit() {
    this.userSubmitted = true;
    console.log(this.registrationForm.value);
    if(!this.registrationForm.valid)
      return;
    //this.user = Object.assign(this.user, this.registrationForm.value);
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
  }

  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
