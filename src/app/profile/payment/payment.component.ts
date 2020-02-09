import {Component, OnInit} from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  braintree: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    dropin.create({
      authorization: 'sandbox_fwm487c2_sjp9wxhy2nnq53hk',
      container: '#dropin-container',
      card: {
        cardholderName: {
          required: true
        }
      },
      cvv: {
        required: true
      }
    }).then(value => this.braintree = value);
  }

  pay() {
    this.braintree.requestPaymentMethod((err, payload) => {
      this.httpClient.post('http://localhost:8081/backedup-payment', {plan: '1', paymentNonce: payload.nonce})
        .subscribe(value => console.log(value));
    });
  }
}
