import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    let acc = new Map();
    for (let i = 0; i < 100000; i++) {
      let message = this.random();
      if (acc.has(message.substr(message.length - 7))) {
        acc.set(message.substr(message.length - 7), acc.get(message.substr(message.length - 7)) + 1);
      } else {
        acc.set(message.substr(message.length - 7), 1);
      }
    }
    acc.forEach((value, key) => {
      if (acc.get(key) > 1) {
        console.log({key, value})
      }
    });
  }

  private random(): string {
    return new Date().getTime() + '' + Math.floor(Math.random() * 10000000)
  }
}
