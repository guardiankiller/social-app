import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs'
import { User } from '../models/user.model';
import { UserRegister } from '../models/user-register.model';
import { MockServerService } from './mock-server.service';
import { LoginInfo } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  state = new Map<string, User>();

  failFirst = true;

  constructor(private server: MockServerService) {

  }

  verifyLoginInfo(info: LoginInfo): Observable<boolean> {
    return this.server.authenticate(info.username, info.password);
  }
  
  loadUserProfileData(): Observable<User> {
    return new Observable(subscriber => {
      setTimeout(()=>{
        // if(this.failFirst) {
        //   this.failFirst = false;
        //   subscriber.error(new Error('Failed to connect to server'));
        // }
        subscriber.next({
          firstName: "Николай",
          lastName: "Проданов",
          nFriends: 255,
          email: "nikiavatar98@abv.bg",
          username: "nikiavatar98",
          dateOfBirth: new Date('1998-04-14'),
          profilePic: "../../../../assets/profile.jpg",
          gender: 'MALE'
        });
        subscriber.complete();
      }, 0);
    });
  }

  loadUserProfileData2(username: string): Observable<User | undefined> {
    return this.server.getUser(username);
  }

  registerUser(register: UserRegister) {
    return new Observable<void>(subscriber => {
      setTimeout(() => {
        if(this.state.has(register.username)) {
          subscriber.error(new Error(`The username ${register.username} is already taken`));
        }
        this.state.set(register.username, {
          firstName: register.firstName,
          lastName: register.lastName,
          nFriends: 255,
          email: register.email,
          username: register.username,
          dateOfBirth: register.dateOfBirth,
          profilePic: "../../../../assets/profile.jpg",
          gender: register.gender
        });
        subscriber.next();
        subscriber.complete();
      }, 5000);
    })
  }
}
