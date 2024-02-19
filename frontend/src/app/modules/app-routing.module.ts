import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding  } from '@angular/router';

import { RegisterComponent } from '../components/pages/register/register.component';
import { UserProfileComponent } from '../components/pages/user-profile/user-profile.component';
import { LoginPageComponent } from '../components/pages/login-page/login-page.component';
import { isLoggedIn, isNotLoggedIn } from '../utils/guards';
import { ImageViewPageComponent } from '../components/pages/image-view-page/image-view-page.component';
import { resloveImageView } from '../utils/resolvers';
import { ErrorPageComponent } from '../components/pages/error-page/error-page.component';

const routes: Routes = [
  {
    component: RegisterComponent,
    path: 'register',
    canActivate: [ isNotLoggedIn ]
  },
  {
    component: UserProfileComponent,
    path: 'users/:username',
    canActivate: [ isLoggedIn ]
  },
  {
    component: ImageViewPageComponent,
    path: 'users/:username/images/:imageId',
    canActivate: [ isLoggedIn ],
    resolve: {
      result: resloveImageView
    }
  },
  {
    component: LoginPageComponent,
    path: 'login',
    canActivate: [ isNotLoggedIn ]
  },
  {
    component: ErrorPageComponent,
    path: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
