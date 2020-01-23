import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backedup-website';
  slides = [
    'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg'
  ];
}
