import {Component, OnInit} from '@angular/core';
import {NotifySubscription} from './notify-subscription';
import {HttpClient} from '@angular/common/http';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import {NgForm} from '@angular/forms';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  model: NotifySubscription = new NotifySubscription();
  sendingInProgress: boolean;
  formSubmitted: boolean;
  messageSuccessfullySent: boolean;

  constructor(private httpClient: HttpClient,
              private $gaService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  onSubmit(subscriptionForm: NgForm): void {
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
      }, error => {
        this.$gaService.exception('Failed to send message ' + error);
        this.failure();
      });
    }
  }

  private success() {
    this.$gaService.event('pageLoaded', 'profilePage', this.model.email);
    this.messageSuccessfullySent = true;
    this.reset();
  }

  private failure() {
    this.$gaService.exception('Failed to send message to ' + this.model.email);
    this.messageSuccessfullySent = false;
    this.reset();
  }

  private reset() {
    this.formSubmitted = true;
    this.sendingInProgress = false;
  }
}
