import {Component, OnInit} from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

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
    this.planId = this.route.snapshot.paramMap.get('planId');
    this.customerId = this.route.snapshot.paramMap.get('customerId');
  }

  pay() {
    this.braintree.requestPaymentMethod((err, payload) => {
      this.httpClient.post('http://localhost:8082/pay-subscription', {
        planId: this.planId,
        customerId: this.customerId,
        paymentNonce: payload.nonce
      }).subscribe(() => this.router.navigate(['/profile']));
    });
  }
}
