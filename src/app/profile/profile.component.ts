import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  user: { id: string; username: string; email: string };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );

    this.authService.auth$.subscribe(({id, username, email}) => {
      this.user = {id, username, email};
    });
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
