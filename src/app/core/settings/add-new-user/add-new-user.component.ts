import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../../../services/add-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GetPaymentResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  payments: GetPaymentResponse[] = [];
  selectedPayments: string[] = [];
  loading = false;
  readonly template = [
    { align: 'left', ratio: 1 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];
  constructor(
    private api: ApiService,
    public addUserService: AddUserService,
    private router: Router,
    private link: ActivatedRoute) { }

  async ngOnInit() {
    this.loading = true;
    this.payments = (await this.api.getPayments()).activePayments;
    this.loading = false;
  }

  select(paymentId: string, select: boolean) {
    if (select) {
      if (!this.selectedPayments.includes(paymentId)) this.selectedPayments.push(paymentId);
    } else {
      if (this.selectedPayments.includes(paymentId))
        this.selectedPayments.splice(this.selectedPayments.findIndex(p => p === paymentId), 1);
    }
    console.log(this.selectedPayments);
  }

  selectAll() {
    this.selectedPayments = this.payments.map(p => p.id);
    console.log(this.selectedPayments);

  }

  deselectAll() {
    this.selectedPayments = [];
    console.log(this.selectedPayments);
  }

  save() {
    this.loading = true;
    this.api.addMemberToExistingRoom({ name: this.addUserService.name, includedPaymentIds: this.selectedPayments });
    this.loading = false;
    this.router.navigate(['../../'], {relativeTo: this.link});
  }
}
