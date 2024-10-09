import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetDebtMemberResponse, GetDebtResponse, GetDebtsResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  template = [
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];

  debts: GetDebtsResponse = { currency: '', debts: [] };
  loading = false;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.debts = await this.api.getDebts();
    this.loading = false;
  }

  done(debtMember: GetDebtMemberResponse, debt: GetDebtResponse) {
    this.loading = true;
    this.api.uploadPayment({
      memberId: debtMember.id,
      split: [{ memberId: debt.payeeId, units: 1 }],
      value: debt.value,
      currency: this.debts.currency,
      note: `${debt.value} ${this.debts.currency} debt arrangement between ${debtMember.name} and ${debt.payeeName}`
    }).then(() => {
      this.loading = false;
      this.init();
    });
  }
}
