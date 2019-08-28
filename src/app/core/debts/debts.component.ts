import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Member, Arrangement } from 'src/app/models/debter.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit, OnDestroy {

  template = [
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];

  members: Member[];
  subscription: Subscription;
  loading = false;

  constructor(public roomService: RoomService) {
  }

  ngOnInit() {
    this.members = this.roomService.room.value.members;
    this.subscription = this.roomService.room.subscribe(room => this.members = room.members);
  }

  done(arrangment: Arrangement) {
    this.loading = true;
    this.roomService.arrangeDebt(arrangment)
    .then(() => {this.loading = false; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
