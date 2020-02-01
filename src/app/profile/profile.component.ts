import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../authentication/auth.service';
import {Referral} from '../referral';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  user: { id: string; username: string; email: string };
  progressBarType: string;
  usedSpace: number;
  totalSpace: number;
  referrals: Referral[] = [
    {username: 'Joe', date: new Date().getTime(), bonus: 2},
    {username: 'Black', date: new Date().getTime(), bonus: 2}
  ];

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );

    this.authService.auth$.subscribe(({id, username, email}) => {
      this.user = {id, username, email};
    });

    const spaceForUser = this.getSpaceForUser();
    this.usedSpace = spaceForUser.usedSpace;
    this.totalSpace = spaceForUser.totalSpace;
    const percentOfUsedSpace = spaceForUser.usedSpace / spaceForUser.totalSpace;
    if (percentOfUsedSpace <= 0.5) {
      this.progressBarType = 'success';
    } else if (percentOfUsedSpace > 0.5 && percentOfUsedSpace <= 0.8) {
      this.progressBarType = 'warning';
    } else {
      this.progressBarType = 'danger';
    }
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  getSpaceForUser() {
    return {usedSpace: 50, totalSpace: 100};
  }

  filledOverText(): boolean {
    return this.usedSpace / this.totalSpace >= 0.5;
  }
}
