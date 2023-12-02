import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { loadUserProfileInfo, loadUserProfileInfoFail, loadUserProfileInfoSuccess } from './user-profile.actions'
import { exhaustMap, of, map, catchError, tap, switchMap } from 'rxjs'
import { UserProfileService } from 'src/app/services/user-profile.service'

@Injectable()
export class UserProfileEffects {

    loadUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserProfileInfo),
            tap(({ username }) => console.log("Loading "+username)),
            switchMap(({ username }) => this.userProfile.loadUserProfileData2(username).pipe(
                map(profile => profile ? loadUserProfileInfoSuccess({profile}) : loadUserProfileInfoFail({error: new Error(`${username} not found`)})),
                catchError((error: Error, _) => of(loadUserProfileInfoFail({error})))
            ))
        )
    );

    constructor(private actions$: Actions, private userProfile: UserProfileService) {}
}