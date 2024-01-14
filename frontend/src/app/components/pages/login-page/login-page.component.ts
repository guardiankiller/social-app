import { Component, OnInit, computed, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginInfoStatus } from 'src/app/models/login.model';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  error = this.service.message;

  status = this.service.status;

  isPending = computed(() => this.status() === LoginInfoStatus.PENDING);

  isLoggedIn = computed(() => this.status() === LoginInfoStatus.LOGGED_IN);

  isFail = computed(() => this.status() === LoginInfoStatus.FAIL);

  form = this.fb.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bar: MatSnackBar,
    private service: UserAuthenticationService) {

      effect(() => {
        if(this.isLoggedIn()) {
          let b = bar.open('Login successful', 'OK');
          b._dismissAfter(1000);
          b.afterDismissed()
          .subscribe(_ => this.router.navigate(['/users', this.service.username()]));
        }
      });
      effect(()=> {
        if(this.isFail()) {
          bar.open(this.error() || 'Unknown error', 'OK');;
        }
      });
    }

  ngOnInit(): void {
  }

  get username() {
    return this.form.controls['username']
  }

  get password() {
    return this.form.controls['password']
  }

  get isValid() {
    return this.form.status == 'VALID';
  }

  submit() {
    this.service.login({
      username: this.username.value!,
      password: this.password.value!
    });
  }
}
