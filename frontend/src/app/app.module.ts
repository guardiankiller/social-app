import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { PostComponent } from './components/layouts/post/post.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProfilePanelMainComponent } from './components/layouts/profile-panel-main/profile-panel-main.component';
import { ProfilePanelSideComponent } from './components/layouts/profile-panel-side/profile-panel-side.component';
import { UserProfileEffects } from './state/user-profile/user-profile.effects';
import { userProfileReducer } from './state/user-profile/user-profile.reducers';
import { userRegisterReducer } from './state/user-register/user-register.reducers';
import { UserRegisterEffects } from './state/user-register/user-register.effects';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserProfileComponent,
    PostComponent,
    ProfilePanelMainComponent,
    ProfilePanelSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([UserProfileEffects, UserRegisterEffects]),
    StoreModule.forRoot({userProfileInfo: userProfileReducer, userRegister: userRegisterReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
