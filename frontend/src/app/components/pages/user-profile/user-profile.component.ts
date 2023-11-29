import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  profile: User = {
    firstName: "Николай",
    lastName: "Проданов",
    nFriends: 255,
    email: "nikiavatar98@abv.bg",
    username: "nikiavatar98",
    dateOfBirth: new Date('1998-04-14'),
    profilePic: "../../../../assets/profile.jpg",
    gender: 'MALE'
  }
}
