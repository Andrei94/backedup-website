import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  contact() {
    window.location.href = 'http://localhost:4201/contact';
  }

  auth() {
    window.location.href = 'http://localhost:4201/auth';
  }
}
