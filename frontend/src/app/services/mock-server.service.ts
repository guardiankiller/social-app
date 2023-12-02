import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, delay } from 'rxjs'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockServerService {

  private users = new BehaviorSubject<Map<string, User>>(new Map());

  private passwords = new BehaviorSubject<Map<string, string>>(new Map());

  constructor() {
    this.addUser({
      firstName: "Николай",
      lastName: "Проданов",
      nFriends: 255,
      email: "nikiavatar98@abv.bg",
      username: "nikiavatar98",
      dateOfBirth: new Date('1998-04-14'),
      profilePic: "../../../../assets/profile.jpg",
      gender: 'MALE'
    });
  }

  addUser(user: User) {
    this.addUserWithPass(user, 'admin');
  }

  userExists(username: string) {
    return this.users
      .getValue()
      .has(username);
  }

  addUserWithPass(user: User, password: string) {
    this.users.next(
      this.users.getValue().set(user.username, user)
    );

    this.passwords.next(
      this.passwords.getValue().set(user.username, password)
    );
  }

  getUsers(): Observable<User[]> {
    return this.users.pipe(
      map(map => Array.from(map.values()))
    );
  }

  getUser(user: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(arr => arr.find(x=>x.username === user))
    );
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return of(this.passwords.getValue().get(username) === password).pipe(delay(3000));
  }
}
