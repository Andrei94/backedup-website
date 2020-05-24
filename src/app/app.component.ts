import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifySubscription} from './notify-subscription';
import {HttpClient} from '@angular/common/http';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import {NgForm} from '@angular/forms';
import {environment} from '../environments/environment';
import {Subscription} from 'rxjs';
import {NgcCookieConsentService, NgcStatusChangeEvent} from 'ngx-cookieconsent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  model: NotifySubscription = new NotifySubscription();
  sendingInProgress: boolean;
  formSubmitted: boolean;
  messageSuccessfullySent: boolean;
  private consentGiven = true;

  private statusChangeSubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private $gaService: GoogleAnalyticsService,
              private ccService: NgcCookieConsentService) {
  }

  ngOnInit() {
    this.$gaService.event('pageLoaded', 'landingPage');
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        this.consentGiven = event.status === 'allow';
      });
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
        if (this.consentGiven) {
          this.$gaService.exception('Failed to send message ' + error);
        }
        this.failure();
      });
    }
  }

  ngOnDestroy() {
    this.statusChangeSubscription.unsubscribe();
  }

  private success() {
    if (this.consentGiven) {
      this.$gaService.event('emailSent', 'landingPage', this.model.email);
    }
    this.messageSuccessfullySent = true;
    this.reset();
  }

  private reset() {
    this.formSubmitted = true;
    this.sendingInProgress = false;
  }

  private failure() {
    if (this.consentGiven) {
      this.$gaService.exception('Failed to send message to ' + this.model.email);
    }
    this.messageSuccessfullySent = false;
    this.reset();
  }
}
