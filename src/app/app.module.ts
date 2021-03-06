import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {CommonModule} from '@angular/common';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {NgtUniversalModule} from '@ng-toolkit/universal';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {NavbarComponent} from './navbar/navbar.component';
import {environment} from '../environments/environment';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain
  },
  palette: {
    popup: {
      background: '#00496f'
    },
    button: {
      background: '#00496f'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    NgbModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    NgxGoogleAnalyticsModule.forRoot(environment.trackingCode),
    NgcCookieConsentModule.forRoot(cookieConfig)
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
