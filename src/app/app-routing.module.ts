import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './aws/profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationComponent} from './aws/authentication/authentication.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthenticationComponent, loadChildren: () => import('./aws/aws.module').then(m => m.AwsModule)},
  {path: 'profile', component: ProfileComponent, loadChildren: () => import('./aws/aws.module').then(m => m.AwsModule)},
  {path: 'pay/:customerId/:planId', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
