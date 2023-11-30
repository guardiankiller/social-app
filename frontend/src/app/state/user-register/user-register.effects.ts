import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { switchMap, of, map, catchError, withLatestFrom } from 'rxjs'
import { UserProfileService } from "src/app/services/user-profile.service";
import { registerUserSubmit, registerUserFail, registerUserSuccess } from "./user-register.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { selectRegisterInfo } from "./user-register.selectors";
import { UserRegister } from 'src/app/models/user-register.model'


@Injectable()
export class UserRegisterEffects {

    registerUserEffect$ = createEffect(()=> this.actions$.pipe(
        ofType(registerUserSubmit),
        withLatestFrom( this.store.select(selectRegisterInfo)),
        switchMap((info) => 
            this.registerService.registerUser(info[1] as UserRegister).pipe(
                map(() => registerUserSuccess()),
                catchError((error: Error, _) => of(registerUserFail({error})))
            )
        )
    )
    
    
    );


    constructor(
        private actions$: Actions, 
        private registerService: UserProfileService,
        private store: Store<AppState>) {

    }
}
