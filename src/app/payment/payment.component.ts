import {Component, OnInit} from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  braintree: any;
  customerId: string;
  planId: string;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.planId = this.route.snapshot.paramMap.get('planId');
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.getClientToken(this.customerId).subscribe(token => {
      dropin.create({
        authorization: (token as any).token,
        container: '#dropin-container',
        vaultManager: true,
        card: {
          cardholderName: {
            required: true
          }
        },
        cvv: {
          required: true
        }
      }).then(value => this.braintree = value);
    });
  }

  pay() {
    this.braintree.requestPaymentMethod((err, payload) => {
      this.httpClient.post(environment.paySubscriptionUrl, {
        planId: this.planId,
        customerId: this.customerId,
        paymentNonce: payload.nonce
      }).subscribe(() => this.router.navigate(['/profile']));
    });
  }

  private getClientToken(customer: string) {
    return this.httpClient.post(environment.generateClientTokenUrl, {customerId: customer});
  }
}
