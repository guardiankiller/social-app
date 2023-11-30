import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { loadUserProfileInfo, loadUserProfileInfoFail, loadUserProfileInfoSuccess } from './user-profile.actions'
import { exhaustMap, of, map, catchError } from 'rxjs'
import { UserProfileService } from 'src/app/services/user-profile.service'

@Injectable()
export class UserProfileEffects {

    loadUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserProfileInfo),
            exhaustMap(() => this.userProfile.loadUserProfileData().pipe(
                map(profile => loadUserProfileInfoSuccess({profile})),
                catchError((error: Error, _) => of(loadUserProfileInfoFail({error})))
            ))
        )
    );

    constructor(private actions$: Actions, private userProfile: UserProfileService) {}
}