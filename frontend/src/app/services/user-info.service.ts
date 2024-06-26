import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Status } from '../models/status.model';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { UserBasicInfo } from '../models/user.basic.model';
import { makeError } from '../utils/errors';
import { UserAuthenticationService } from './user-authentication.service';

interface UserResponse { 
  username: string
  firstName: string
  lastName: string
  userEmail: string
  dateOfBirth: string
  gender: string
  createdDateTime: string
  updatedDateTime: string
  url?: string
  currProfileImageId?: number
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient, private authService: UserAuthenticationService) {}

  user: WritableSignal<User | null> = signal(null);

  status: WritableSignal<Status> = signal(Status.INIT);

  message: WritableSignal<string> = signal("");

  public loadUserInfo(username: string): Observable<User> {
    return this.http
      .get<UserResponse>("/api/users/"+username)
      .pipe(switchMap(response => {
        if(response.url == null) {
          return of(this.toUser(response, "../../../../assets/profile.jpg"))
        }
        return this.http.get(response.url, { responseType: 'blob' })
          .pipe(map(blob => {
            let url = URL.createObjectURL(blob)
            return this.toUser(response, url);
          }))
      }), catchError((error: HttpErrorResponse) => {
        console.log(error);
        throw makeError(error);
      }));
  }

  private toUser(response: UserResponse, url: string): User {
    return {
      firstName: response.firstName,
      lastName: response.lastName,
      nFriends: 255,
      email: response.userEmail,
      username: response.username,
      dateOfBirth: new Date(response.dateOfBirth),
      profilePic: url,
      gender: response.gender,
      currentUser: response.username === this.authService.username(),
      userProfileURL: url ? `/users/${response.username}/images/${response.currProfileImageId}` : undefined
    };
  }

  loadUser(username: string) {
    this.http.get<UserResponse>("/api/users/"+username)
    .pipe(catchError((error: HttpErrorResponse) => {
      console.log(error);
      this.status.set(Status.FAIL);
      this.message.set("Server returned: "+ error.error)
      return of(null);
    }))
    .subscribe(success => {
      if(success == null) {
        return;
      }
      this.status.set(Status.SUCCESS);
      this.user.set({
        firstName: success.firstName,
        lastName: success.lastName,
        nFriends: 255,
        email: success.userEmail,
        username: success.username,
        dateOfBirth: new Date(success.dateOfBirth),
        profilePic: "../../../../assets/profile.jpg",
        gender: success.gender,
        currentUser: true,
        userProfileURL: `/users/${success.username}`
      });
    });
  }

  public getUserInfoBasic(username: string) {
    return this.http
      .get<UserResponse>(`/api/users/${username}`)
      .pipe(switchMap(user => {
        let userInfo: UserBasicInfo = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          profilePicURL: "../../../../assets/profile.jpg"
        }
        if(user.url) {
          return this.http
          .get(user.url, { responseType: 'blob' })
          .pipe(map(blob => {
            userInfo.profilePicURL = URL.createObjectURL(blob);
            return userInfo;
          }))
        }
        return of(userInfo);
      }))
  }
}
