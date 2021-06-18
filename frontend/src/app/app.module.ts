// Module Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component imports
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

// environment import
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
