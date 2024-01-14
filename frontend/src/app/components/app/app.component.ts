import { Component, OnInit, computed } from '@angular/core';
import { LoginInfoStatus } from 'src/app/models/login.model';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private service: UserAuthenticationService) {}
  
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
