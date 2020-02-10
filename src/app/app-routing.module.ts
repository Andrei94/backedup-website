import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {PaymentComponent} from './profile/payment/payment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'pay/:customerId/:planId', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
