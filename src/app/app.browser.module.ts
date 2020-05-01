import {BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {AppModule} from './app.module';
import {environment} from '../environments/environment';

@NgModule({
  imports: [
    NgbModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AppModule,
    BrowserTransferStateModule,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.siteKey,
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
