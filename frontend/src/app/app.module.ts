import { NgModule, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { PostComponent } from './components/layouts/post/post.component';
import { ProfilePanelMainComponent } from './components/layouts/profile-panel-main/profile-panel-main.component';
import { ProfilePanelSideComponent } from './components/layouts/profile-panel-side/profile-panel-side.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProvider } from './services/user-authentication.service';
import { ImageViewPageComponent } from './components/pages/image-view-page/image-view-page.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserProfileComponent,
    PostComponent,
    ProfilePanelMainComponent,
    ProfilePanelSideComponent,
    LoginPageComponent,
    ImageViewPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  importProvidersFrom(HttpClientModule), authInterceptorProvider, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
