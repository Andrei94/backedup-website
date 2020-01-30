import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg'
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
