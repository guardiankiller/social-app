import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    'username': ['', Validators.required],
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'gender': ['male', Validators.required],
    'dateOfBirth': [new Date(), Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  get username() {
    return this.form.controls['username']
  }

  get firstName() {
    return this.form.controls['firstName']
  }

  get lastName() {
    return this.form.controls['lastName']
  }

  get email() {
    return this.form.controls['email']
  }

  submit() {
  }
}
