import { Component, OnDestroy, computed, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status.model';
import { UserRegister } from 'src/app/models/user-register.model';
import { Subscription, debounceTime, merge } from 'rxjs'
import { UserRegisterService } from 'src/app/services/user-register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  info = this.service.form;

  status = this.service.status;

  error = this.service.message;

  isLoading = computed(() => this.service.status() == Status.LOADING);

  isInit = computed(() => this.service.status() == Status.INIT);

  isSuccess = computed(() => this.service.status() == Status.SUCCESS);

  isFailed = computed(() => this.service.status() == Status.FAIL);

  form = this.fb.group({
    'username': [this.info()?.username || '', Validators.required],
    'firstName': [this.info()?.firstName || '', Validators.required],
    'lastName': [this.info()?.lastName || '', Validators.required],
    'userEmail': [this.info()?.userEmail || '', [Validators.required, Validators.email]],
    'gender': [this.info()?.gender || 'MALE', Validators.required],
    'dateOfBirth': [this.info()?.dateOfBirth || new Date(), Validators.required],
    'password': [this.info()?.password || '', Validators.required],
    'confirm': [this.info()?.confirmPassword || '', Validators.required]
  });

  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private bar: MatSnackBar,
    private service: UserRegisterService) {
    this.addFormBindingToState();
    effect(() => {
      if(this.isFailed()) {
        this.bar.open(this.error() ,'OK');
      }
    });
    effect(() => {
      if(this.isSuccess()) {
        this.bar.open('User registered successfully','OK');
        this.form.reset();
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
        userEmail: v.userEmail || '',
        gender: v.gender || 'MALE',
        dateOfBirth: v.dateOfBirth || new Date(),
        password: v.password || '',
        confirmPassword: v.confirm || ''
      }
      if(!this.info() || !this.shallowEqual(register, this.info())) {
        this.service.form.set(register);
      }
    });
    this.subs.push(sub);
  
    sub = merge(
      this.form.valueChanges, 
      toObservable(this.service.form)
    ).pipe(debounceTime(400)).subscribe(v =>
        this.form.patchValue({
          username: v?.username || '',
          firstName: v?.firstName || '',
          lastName: v?.lastName || '',
          userEmail: v?.userEmail || '',
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
    return this.form.controls['userEmail']
  }

  get gender() {
    return this.form.controls['gender']
  }

  get dateOfBirth() {
    return this.form.controls['dateOfBirth']
  }

  get password() {
    return this.form.controls['password']
  }

  get confirm() {
    return this.form.controls['confirm']
  }

  submit() {
    this.service.send()
  }
}
