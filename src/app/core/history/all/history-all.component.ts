import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetPaymentsResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-history-all',
  templateUrl: './history-all.component.html',
  styleUrls: ['./history-all.component.css']
})
export class HistoryAllComponent implements OnInit {

  template = [
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 1 }
  ];

  payments: GetPaymentsResponse = { activePayments: [], deletedPayments: [] };
  ordered: {cell: number, asc: boolean} = {cell: 2, asc: false};
  loading = false;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.loading = true;
    this.payments = await this.api.getPayments();
    this.loading = false;
    this.order(this.ordered.cell);
  }

  order(n: number) {
    if (n === this.ordered.cell) this.ordered.asc = !this.ordered.asc;
    else this.ordered.cell = n;
    switch (n) {
      case 0:
        this.payments.activePayments.sort((a, b) => {
          return (a.memberName === b.memberName ? 0 : a.memberName > b.memberName ? -1 : 1) * (this.ordered.asc ? 1 : -1);
        });
        break;
      case 1:
        this.payments.activePayments.sort((a, b) => {
          return (a.convertedValue - b.convertedValue) * (this.ordered.asc ? -1 : 1) ;
        });
        break;
      case 2:
        this.payments.activePayments.sort((a, b) => {
          return (a.date.getTime() - b.date.getTime()) * (this.ordered.asc ? 1 : -1);
        });
        break;
      case 3:
        this.payments.activePayments.sort((a, b) => {
          return (a.note === b.note ? 0 : a.note > b.note ? -1 : 1) * (this.ordered.asc ? 1 : -1);
        });
        break;
      default: break;
    }
  }
}
