import {Component, OnInit} from '@angular/core';
import {ContactUs} from './contact-us';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  categories: string[] = ['Feedback', 'Question', 'Bug report', 'Feature request', 'Other'];
  model: ContactUs = new ContactUs();
  sendingInProgress: boolean;
  formSubmitted: boolean;
  messageSuccessfullySent: boolean;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(contactForm: NgForm): void {
    if (contactForm.valid && this.model.captcha) {
      this.sendingInProgress = true;
      this.httpClient.post(environment.contactUsEmail, {
        name: this.model.name,
        email: this.model.email,
        subject: this.model.subject,
        message: this.model.message
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
