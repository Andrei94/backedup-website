import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../authentication/auth.service';
import {Referral} from '../referral';
import {UserSpace, UserSpaceService} from './user-space.service';
import {AnalyticsService} from '../analytics.service';
import {Auth} from 'aws-amplify';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  user: { id: string; username: string; email: string };
  progressBarType: string;
  referrals: Referral[] = [
    {username: 'Joe', date: new Date().getTime(), bonus: 2},
    {username: 'Black', date: new Date().getTime(), bonus: 2}
  ];
  userSpace: UserSpace = {usedSpace: 0, totalSpace: 0};
  customerId: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userSpaceService: UserSpaceService,
              private analyticsService: AnalyticsService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );
    if (!this.customerId) {
      this.createCustomerInGateway();
    }

    this.authService.auth$.subscribe(({id, username, email}) => {
      this.user = {id, username, email};
      this.analyticsService.emitEvent('pageViews', 'pageLoaded', 'profilePage', this.user.username);
    });

    this.userSpaceService.getSpace(this.user.username).subscribe(userSpace => {
      this.userSpace = userSpace;
      const percentOfUsedSpace = userSpace.usedSpace / userSpace.totalSpace;
      if (percentOfUsedSpace <= 0.5) {
        this.progressBarType = 'success';
      } else if (percentOfUsedSpace > 0.5 && percentOfUsedSpace <= 0.8) {
        this.progressBarType = 'warning';
      } else {
        this.progressBarType = 'danger';
      }
    }, error => {
      console.log(error);
      this.userSpace = {usedSpace: 0, totalSpace: 0};
    });
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  filledOverText(): boolean {
    return this.userSpace.usedSpace / this.userSpace.totalSpace >= 0.5;
  }

  private createCustomerInGateway() {
    Auth.currentAuthenticatedUser()
      .then(user =>
        Auth.userAttributes(user).then((value: CognitoUserAttribute[]) => {
          console.log(value);
          this.httpClient.post('http://localhost:8081/create-customer', {
            firstName: value.find(value1 => value1.getName() === 'given_name').getValue(),
            lastName: value.find(value1 => value1.getName() === 'family_name').getValue(),
            email: value.find(value1 => value1.getName() === 'email').getValue(),
            phone: value.find(value1 => value1.getName() === 'phone_number').getValue()
          }).subscribe((createResponse: string) => this.customerId = createResponse, err => console.log(err));
        }));
  }

  subscribeQuarterTB() {
    this.updateTotalStorage('1');
    this.router.navigate(['/pay', this.customerId, 'fp2r']);
    this.analyticsService.emitEvent('subscriptions', 'subscribedQuarterTB', 'subscription', this.user.username);
  }

  subscribeHalfTB() {
    this.updateTotalStorage('2');
    this.router.navigate(['/pay', this.customerId, 'vmf2']);
    this.analyticsService.emitEvent('subscriptions', 'subscribedHalfTB', 'subscription', this.user.username);
  }

  subscribeOneTB() {
    this.updateTotalStorage('3');
    this.router.navigate(['/pay', this.customerId, '29cb']);
    this.analyticsService.emitEvent('subscriptions', 'subscribedOneTB', 'subscription', this.user.username);
  }

  updateTotalStorage(value: string) {
    Auth.currentAuthenticatedUser().then(user => Auth.updateUserAttributes(user, {'custom:totalStorage': value}));
  }
}
