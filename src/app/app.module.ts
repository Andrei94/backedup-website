import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {FormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {CommonModule} from '@angular/common';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {NgtUniversalModule} from '@ng-toolkit/universal';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {NavbarComponent} from './navbar/navbar.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    NgxGoogleAnalyticsModule.forRoot('UA-157507530-1')
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.siteKey,
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
