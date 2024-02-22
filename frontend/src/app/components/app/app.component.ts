import { Component, OnInit, computed } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { LoginInfoStatus } from 'src/app/models/login.model';
import { AppService } from 'src/app/services/app.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private service: UserAuthenticationService,
    app: AppService,
    bar: MatSnackBar) {
      app.errorObs()
        .pipe(
            filter(x=>x!=null), 
            switchMap(err => bar.open(err!, 'OK').afterDismissed()))
            .subscribe(_ => app.clearError());
    }
  
  ngOnInit() {
    this.service.init();
  }

  status = this.service.status;

  username = this.service.username;

  isLoggedIn = computed(() => this.status() === LoginInfoStatus.LOGGED_IN);

  logout() {
    this.service.logout();
  }
}
