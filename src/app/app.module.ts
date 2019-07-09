import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './shared/services/auth-service';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { HeaderComponent } from './components/layouts/header/header.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'meetups',
    component: MeetupsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ToggleButtonComponent,
    MeetupsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
