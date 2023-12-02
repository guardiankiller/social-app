import { Component, computed, effect, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { asapScheduler } from 'rxjs';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';
import { loadUserProfileInfo } from 'src/app/state/user-profile/user-profile.actions';
import { selectUserProfileError, selectUserProfileInfo, selectUserProfileStatus } from 'src/app/state/user-profile/user-profile.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  @Input({required: true}) username: string = ''

  profile = this.store.selectSignal(selectUserProfileInfo);

  status = this.store.selectSignal(selectUserProfileStatus);

  error = this.store.selectSignal(selectUserProfileError);

  isLoading = computed(() => this.status() == Status.LOADING);

  isInit = computed(() => this.status() == Status.INIT);

  isSuccess = computed(() => this.status() == Status.SUCCESS);

  isFailed = computed(() => this.status() == Status.FAIL);

  isNotFound = computed(() => this.status() == Status.NOT_FOUND);

  constructor(private store: Store<AppState>, private bar: MatSnackBar) {
    effect(() => {
      if(this.isFailed() || this.isNotFound()) {
        this.bar.open(this.error()?.message || 'Unkown Error','OK');
      }
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadUserProfileInfo({ username: this.username }))
  }
}
