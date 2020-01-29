import {Component, OnInit} from '@angular/core';
import {Auth} from 'aws-amplify';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private amplifyService: AmplifyService, private router: Router) {
  }

  ngOnInit() {
    this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state === 'signIn_failure') {
        authState.state = 'signIn';
      } else if (authState.state === 'signedOut') {
        this.router.navigate(['/']);
      }
    }, error => console.log(error));
  }

  signOut() {
    Auth.signOut({ global: true }).catch(err => console.log(err));
  }
}
