import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../components/pages/register/register.component';
import { UserProfileComponent } from '../components/pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: UserProfileComponent,
    path: 'user-profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
