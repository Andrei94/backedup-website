import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AmplifyAngularModule, AmplifyModules, AmplifyService} from "aws-amplify-angular";
import {Auth} from "aws-amplify";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {ProfileComponent} from "./profile/profile.component";
import {TotalBonusPipe} from "./profile/total-bonus.pipe";
import {AppRoutingModule} from "../app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AuthenticationComponent,
    ProfileComponent,
    TotalBonusPipe
  ],
  imports: [
    CommonModule,
    AmplifyAngularModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [{
    provide: AmplifyService,
    useFactory: () => {
      return AmplifyModules({
        Auth
      });
    }
  }],
})
export class AwsModule {
}
