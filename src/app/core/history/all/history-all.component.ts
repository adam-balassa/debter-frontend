import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ValuePipe } from 'src/app/shared/pipes/value.pipe';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { Payment, Member } from 'src/app/models/debter.model';

@Component({
  selector: 'app-history-all',
  templateUrl: './history-all.component.html',
  styleUrls: ['./history-all.component.css']
})
export class HistoryAllComponent implements OnInit, OnDestroy {

  template = [
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 4 },
    { align: 'left', ratio: 1 }
  ];

  payments: Payment[] = [];
  members: Member[] = [];
  ordered: {cell: number, asc: boolean} = {cell: 2, asc: false};

  subscriptions: Subscription[] = [];

  constructor(private room: RoomService) {

  }

  ngOnInit() {
    this.members = this.room.room.value.members;
    this.payments = this.room.room.value.payments.filter(p => p.active);
    this.order(this.ordered.cell);

    this.subscriptions.push(this.room.room.subscribe(room => {
      if (room.members.length > 0) {
        this.payments = room.payments.filter(p => p.active);
        this.members = room.members;
        this.order(this.ordered.cell);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  order(n: number) {
    if (n === this.ordered.cell) this.ordered.asc = !this.ordered.asc;
    else this.ordered.cell = n;
    switch (n) {
      case 0:
        this.payments.sort((a, b) => {
          return (a.member.name === b.member.name ? 0 : a.member.name > b.member.name ? -1 : 1) * (this.ordered.asc ? 1 : -1);
        });
        break;
      case 1:
        this.payments.sort((a, b) => {
          return (a.realValue - b.realValue) * (this.ordered.asc ? -1 : 1) ;
        });
        break;
      case 2:
        this.payments.sort((a, b) => {
          return (a.date.getTime() - b.date.getTime()) * (this.ordered.asc ? 1 : -1);
        });
        break;
      case 3:
        this.payments.sort((a, b) => {
          return (a.note === b.note ? 0 : a.note > b.note ? -1 : 1) * (this.ordered.asc ? 1 : -1);
        });
        break;
      default: break;
    }
  }
}
