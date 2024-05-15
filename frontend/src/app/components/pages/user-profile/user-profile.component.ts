import { Component, computed, effect, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  profile: WritableSignal<User> = signal(
    {
      firstName: "FirstName",
      lastName: "LastName",
      nFriends: 255,
      email: "email",
      username: "username",
      dateOfBirth: new Date(),
      profilePic: "../../../../assets/profile.jpg",
      gender: "Male",
      currentUser: false
    }
  )

  isCurrentUser = computed(() => this.profile().currentUser)

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe(data => {
      if('result' in data) {
        let user = data['result'] as User
        console.log(user)
        this.profile.set(user);
      }
    })
  }

}
