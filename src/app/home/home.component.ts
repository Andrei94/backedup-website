import {Component, OnInit} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signedIn: boolean;
  user: any;

  constructor(private amplifyService: AmplifyService, private router: Router) {
  }

  slides = [
    'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg'
  ];

  ngOnInit() {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (authState.state === 'signIn_failure') {
        this.user = null;
        authState.state = 'signIn';
      } else if (authState.state === 'signedIn') {
        this.user = authState.user;
        this.router.navigate(['/profile']);
      }
    }, error => console.log(error));
  }
}
