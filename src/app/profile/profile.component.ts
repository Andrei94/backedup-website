import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../authentication/auth.service';
import {Referral} from '../referral';
import {UserSpace, UserSpaceService} from './user-space.service';
import {AnalyticsService} from '../analytics.service';
import {Auth} from 'aws-amplify';

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

  constructor(private authService: AuthService,
              private router: Router,
              private userSpaceService: UserSpaceService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );

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

  subscribeQuarterTB() {
    this.updateTotalStorage('1');
    this.analyticsService.emitEvent('subscriptions', 'subscribedQuarterTB', 'subscription', this.user.username);
  }

  subscribeHalfTB() {
    this.updateTotalStorage('2');
    this.analyticsService.emitEvent('subscriptions', 'subscribedHalfTB', 'subscription', this.user.username);
  }

  subscribeOneTB() {
    this.updateTotalStorage('3');
    this.analyticsService.emitEvent('subscriptions', 'subscribedOneTB', 'subscription', this.user.username);
  }

  updateTotalStorage(value: string) {
    Auth.currentAuthenticatedUser().then(user => Auth.updateUserAttributes(user, {'custom:totalStorage': value}));
  }
}
