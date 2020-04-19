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
import {HttpClientModule} from '@angular/common/http';
import {PaymentComponent} from './payment/payment.component';
import {DeleteAccountConfirmationComponent} from './delete-account-confirmation/delete-account-confirmation.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    AuthenticationComponent,
    PaymentComponent,
    DeleteAccountConfirmationComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AmplifyAngularModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: AmplifyService,
    useFactory: () => {
      return AmplifyModules({
        Auth
      });
    }
  }],
  bootstrap: [AppComponent],
  entryComponents: [DeleteAccountConfirmationComponent]
})
export class AppModule {
}
