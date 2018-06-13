import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmailSignupComponent } from './signup/email-signup.component';
import { EmailLoginComponent } from './login/email-login.component';
import { EmailComponent } from './email/email.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FocusDirective } from './focus.directive';



@NgModule({
  declarations: [
    AppComponent,
    EmailSignupComponent,
    EmailLoginComponent,
    EmailComponent,
    FocusDirective, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, ToastrModule.forRoot(), 
    RouterModule.forRoot([
      { path: 'email-login', component: EmailLoginComponent },
      { path: 'email-signup', component: EmailSignupComponent },
      { path: 'email/:name/:email', component: EmailComponent },
      { path: '', redirectTo: 'email-login', pathMatch: 'full'},
      { path: '**', redirectTo: 'email-login', pathMatch: 'full'}
  ]) ,
  FormsModule,
  ReactiveFormsModule ,
  HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
