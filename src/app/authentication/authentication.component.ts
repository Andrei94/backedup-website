import {Component, OnInit} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'First Name',
        key: 'given_name',
        required: true,
        displayOrder: 1,
        type: 'string'
      },
      {
        label: 'Last Name',
        key: 'family_name',
        required: true,
        displayOrder: 2,
        type: 'string'
      },
      {
        label: 'Username',
        key: 'username',
        required: true,
        displayOrder: 3,
        type: 'string',
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 4,
        type: 'string',
      },
      {
        label: 'Phone Number',
        key: 'phone_number',
        required: true,
        displayOrder: 5,
        type: 'string'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 6,
        type: 'password'
      }
    ]
  };

  constructor(private amplifyService: AmplifyService, private router: Router) {
  }

  ngOnInit() {
    this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state === 'signIn_failure') {
        authState.state = 'signIn';
      } else if (authState.state === 'signedIn') {
        this.router.navigate(['/profile']);
      }
    }, error => console.log(error));
  }

}
