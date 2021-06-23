import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { AddUserService } from 'src/app/services/add-user.service';
import { Payment, Member, Room } from 'src/app/models/debter.model';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css']
})
export class DeleteMemberComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  members: Member[];
  payments: Payment[];
  loading = false;
  readonly template = [
    { align: 'left', ratio: 1 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];
  constructor(
    public addUserService: AddUserService) { }

  ngOnInit() {
    // this.subscription = this.roomSerice.room.subscribe(room => { this.init(room); });
  }

  init(room: Room) {
    this.payments = room.payments;
    this.members = room.members.filter(
      member => this.payments.every(payment => payment.member !== member && payment.excluded.includes(member)));
  }


  removeMember(member: Member) {
    this.loading = true;
    // this.roomSerice.deleteMember(member).then(() => { this.loading = false; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
