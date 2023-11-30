import { Component, OnDestroy, computed, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Status } from 'src/app/models/status.model';
import { UserRegister } from 'src/app/models/user-register.model';
import { AppState } from 'src/app/state/app.state';
import { registerUserFill, registerUserReset, registerUserSubmit } from 'src/app/state/user-register/user-register.actions';
import { selectRegisterInfo, selectRegisterInfoError, selectRegisterInfoStatus } from 'src/app/state/user-register/user-register.selectors';
import { Subscription, asapScheduler, debounceTime, map, merge } from 'rxjs'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  info = this.store.selectSignal(selectRegisterInfo);

  status = this.store.selectSignal(selectRegisterInfoStatus);

  error = this.store.selectSignal(selectRegisterInfoError);

  isLoading = computed(() => this.status() == Status.LOADING);

  isInit = computed(() => this.status() == Status.INIT);

  isSuccess = computed(() => this.status() == Status.SUCCESS);

  isFailed = computed(() => this.status() == Status.FAIL);

  form = this.fb.group({
    'username': [this.info()?.username || '', Validators.required],
    'firstName': [this.info()?.firstName || '', Validators.required],
    'lastName': [this.info()?.lastName || '', Validators.required],
    'email': [this.info()?.email || '', [Validators.required, Validators.email]],
    'gender': [this.info()?.gender || 'MALE', Validators.required],
    'dateOfBirth': [this.info()?.dateOfBirth || new Date(), Validators.required]
  });

  subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>, private bar: MatSnackBar) {
    this.addFormBindingToState();
    effect(() => {
      if(this.isFailed()) {
        this.bar.open(this.error()?.message || 'Unkown Error','OK');
      }
    });
    effect(() => {
      if(this.isSuccess()) {
        this.bar.open('User registered successfully','OK');
        this.form.reset();
        asapScheduler.schedule(()=>this.store.dispatch(registerUserReset()));
        this.form.reset();
      }
    });
  }

  addFormBindingToState() {
    let sub = this.form.valueChanges
    .pipe(debounceTime(400))
    .subscribe(v => {
      let register: UserRegister = {
        username: v.username || '',
        firstName: v.firstName || '',
        lastName: v.lastName || '',
        email: v.email || '',
        gender: v.gender || 'MALE',
        dateOfBirth: v.dateOfBirth || new Date()
      }
      if(!this.info() || !this.shallowEqual(register, this.info())) {
        this.store.dispatch(registerUserFill({register: register}));
      }
    });
    this.subs.push(sub);
  
    sub = merge(
      this.form.valueChanges, 
      this.store.select(selectRegisterInfo)
    ).pipe(debounceTime(400)).subscribe(v =>
        this.form.patchValue({
          username: v?.username || '',
          firstName: v?.firstName || '',
          lastName: v?.lastName || '',
          email: v?.email || '',
          gender: v?.gender || 'MALE',
          dateOfBirth: v?.dateOfBirth || new Date()
        })
    );
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  shallowEqual(object1: any, object2: any) {
    if(object1 == object2) {
      return true;
    }
    if(!object1 || !object2) {
      return false;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }

  get isValid() {
    return this.form.status == 'VALID';
  }

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

  get gender() {
    return this.form.controls['gender']
  }

  get dateOfBirth() {
    return this.form.controls['dateOfBirth']
  }

  submit() {
    this.store.dispatch(registerUserSubmit())
  }
}
