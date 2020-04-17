import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-account-confirmation',
  templateUrl: './delete-account-confirmation.component.html',
  styleUrls: ['./delete-account-confirmation.component.css']
})
export class DeleteAccountConfirmationComponent implements OnInit {
  @Input()
  username: string;
  @Input()
  customerId: string;

  deleteInProgress: boolean;

  constructor(private modal: NgbActiveModal,
              private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  delete() {
    this.deleteInProgress = true;
    this.httpClient.post(environment.cancelSubscriptionUrl, {
      username: this.username,
      customerId: this.customerId
    }).subscribe(() => {
      this.modal.close('Ok click');
      this.router.navigate(['/']);
    });
  }
}
