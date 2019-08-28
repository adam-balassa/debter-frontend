import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Payment, Room } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-history-undo',
  templateUrl: './history-undo.component.html',
  styleUrls: ['./history-undo.component.css']
})
export class HistoryUndoComponent implements OnInit, OnDestroy {

  deletedPayments: Payment[];
  validPayments: Payment[];
  subscriptions: Subscription[] = [];

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

  loading = false;


  constructor(private room: RoomService) {

  }

  ngOnInit() {
    this.subscriptions.push(this.room.room.subscribe(room => {
      this.init(room);
    }));
  }

  init(room: Room) {
    this.validPayments = room.payments.filter(payment => payment.active);
    this.deletedPayments = room.payments.filter(payment => !payment.active);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  revive(payment: Payment) {
    this.loading = true;
    this.room.revivePayment(payment)
    .then(() => { this.loading = false; this.init(this.room.room.value); });
  }

  delete(payment: Payment) {
    this.loading = true;
    this.room.deletePayment(payment)
    .then(() => { this.loading = false;  this.init(this.room.room.value); });
  }


  messageBoxDisappear() {
    this.message.displayed = false;
  }

}
