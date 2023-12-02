import { Component, OnInit, computed, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginInfoStatus } from 'src/app/models/login.model';
import { AppState } from 'src/app/state/app.state';
import { login, selectError, selectStatus, selectUsername } from 'src/app/state/login-profile/login-profile.reducers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  error = this.store.selectSignal(selectError);

  status = this.store.selectSignal(selectStatus);

  stateUsername = this.store.selectSignal(selectUsername);

  isPending = computed(() => this.status() === LoginInfoStatus.PENDING);

  isLoggedIn = computed(() => this.status() === LoginInfoStatus.LOGGED_IN);

  isFail = computed(() => this.status() === LoginInfoStatus.FAIL);

  form = this.fb.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>,
    private router: Router,
    private bar: MatSnackBar) {

      effect(() => {
        if(this.isLoggedIn()) {
          let b = bar.open('Login successful', 'OK');
          b._dismissAfter(1000);
          b.afterDismissed()
          .subscribe(_ => this.router.navigate(['/users', this.stateUsername()]));
        }
      });
      effect(()=> {
        if(this.isFail()) {
          bar.open(this.error()?.message || 'Unknown error', 'OK');;
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
    this.store.dispatch(login({login: {
      username: this.username.value!,
      password: this.password.value!
    }}));
  }
}
