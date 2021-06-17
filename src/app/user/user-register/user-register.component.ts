import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: any = {};
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Mark', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validator: ConfirmedValidator('password', 'confirmPassword')})
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

  OnSubmit(){
    console.log(this.registrationForm.value);
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.addUser(this.user);
  }

  addUser(user:any){
    let users = [];
    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users') || '[]');
      users = [user, ...users];
    }else{
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(user));
  }


}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
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
