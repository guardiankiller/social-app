import { Component, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginInfoStatus } from 'src/app/models/login.model';
import { AppState } from 'src/app/state/app.state';
import { logout, selectStatus, selectUsername } from 'src/app/state/login-profile/login-profile.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private store: Store<AppState>) {}

  status = this.store.selectSignal(selectStatus);

  username = this.store.selectSignal(selectUsername);

  isLoggedIn = computed(() => this.status() === LoginInfoStatus.LOGGED_IN);

  logout() {
    this.store.dispatch(logout());
  }
}
