import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {AmplifyAngularModule, AmplifyModules, AmplifyService} from 'aws-amplify-angular';
import {Auth} from 'aws-amplify';
import {AuthenticationComponent} from './authentication/authentication.component';
import {TotalBonusPipe} from './profile/total-bonus.pipe';
import {HttpClientModule} from '@angular/common/http';
import {PaymentComponent} from './profile/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    AuthenticationComponent,
    TotalBonusPipe,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AmplifyAngularModule,
    HttpClientModule
  ],
  providers: [{
    provide: AmplifyService,
    useFactory: () => {
      return AmplifyModules({
        Auth
      });
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
