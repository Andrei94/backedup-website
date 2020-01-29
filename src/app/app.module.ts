import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {AmplifyAngularModule, AmplifyModules, AmplifyService} from 'aws-amplify-angular';
import {Auth} from 'aws-amplify';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AmplifyAngularModule
  ],
  providers: [{
    provide: AmplifyService,
    useFactory:  () => {
      return AmplifyModules({
        Auth
      });
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
