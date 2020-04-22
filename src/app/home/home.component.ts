import {Component, OnInit} from '@angular/core';
import {NotifySubscription} from './notify-subscription';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }
  model: NotifySubscription = new NotifySubscription();
  sendingInProgress: boolean;
  formSubmitted: boolean;
  messageSuccessfullySent: boolean;

  private static random(): string {
    return new Date().getTime() + '' + Math.floor(Math.random() * 10000000);
  }

  ngOnInit() {
    const acc = new Map();
    for (let i = 0; i < 100000; i++) {
      const message = HomeComponent.random();
      if (acc.has(message.substr(message.length - 7))) {
        acc.set(message.substr(message.length - 7), acc.get(message.substr(message.length - 7)) + 1);
      } else {
        acc.set(message.substr(message.length - 7), 1);
      }
    }
    acc.forEach((value, key) => {
      if (acc.get(key) > 1) {
        console.log({key, value});
      }
    });
  }

  onSubmit(subscriptionForm: NgForm): void {
    console.log(subscriptionForm);
    if (subscriptionForm.valid) {
      this.sendingInProgress = true;
      this.httpClient.post(environment.notifySubscription, {
        email: this.model.email
      }).subscribe((value: any) => {
        if (value.errorMessage) {
          this.failure();
        } else {
          this.success();
        }
      }, () => this.failure());
    }
  }

  private success() {
    this.messageSuccessfullySent = true;
    this.reset();
  }

  private failure() {
    this.messageSuccessfullySent = false;
    this.reset();
  }

  private reset() {
    this.formSubmitted = true;
    this.sendingInProgress = false;
  }
}
