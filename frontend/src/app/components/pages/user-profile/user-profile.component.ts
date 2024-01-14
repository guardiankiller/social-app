import { Component, computed, effect, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status.model';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  @Input({required: true}) username: string = ''

  isCurrentUser = computed(() => this.authService.username() === this.username);

  profile = this.service.user;

  status = this.service.status;

  error = this.service.message;

  isLoading = computed(() => this.status() == Status.LOADING);

  isInit = computed(() => this.status() == Status.INIT);

  isSuccess = computed(() => this.status() == Status.SUCCESS);

  isFailed = computed(() => this.status() == Status.FAIL);

  isNotFound = computed(() => this.status() == Status.NOT_FOUND);

  constructor(
    private service: UserInfoService, 
    private bar: MatSnackBar,
    private authService: UserAuthenticationService) {
    effect(() => {
      if(this.isFailed() || this.isNotFound()) {
        this.bar.open(this.error() || 'Unkown Error','OK');
      }
    });
  }
  ngOnInit(): void {
    this.service.loadUser(this.username);
  }
}
