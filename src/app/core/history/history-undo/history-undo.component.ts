import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/models/debter-interfaces.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history-undo',
  templateUrl: './history-undo.component.html',
  styleUrls: ['./history-undo.component.css']
})
export class HistoryUndoComponent implements OnInit {

  readonly template = [
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];

  message = {
    content: '',
    alert: false,
    header: '',
    displayed: false
  };

  payments: GetPaymentsResponse = { activePayments: [], deletedPayments: [] };
  loading = false;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.payments = await this.api.getPayments();
  }

  revive(id: string) {
    this.loading = true;
    this.api.revivePayment(id)
    .then(() => { this.loading = false; this.init(); });
  }

  delete(id: string) {
    this.loading = true;
    this.api.deletePayment(id)
    .then(() => { this.loading = false; this.init(); });
  }


  messageBoxDisappear() {
    this.message.displayed = false;
  }

}
