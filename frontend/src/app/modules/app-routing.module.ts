import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../components/pages/user-profile/user-profile.component';

const routes: Routes = [
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
