import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login.effects';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { TestPipePipe } from './test-pipe.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SampleInterceptor } from './interceptor/sample.interceptor';
import { TestInterceptor } from './interceptor/test.interceptor';
  
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    EditProfileComponent,
    ErrorComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    TestPipePipe,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth : authReducer }),
    EffectsModule.forRoot(AuthEffects)
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:SampleInterceptor, multi:true},
              {provide:HTTP_INTERCEPTORS, useClass:TestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
