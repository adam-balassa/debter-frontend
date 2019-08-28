import { Component, OnInit, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { Member } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.css']
})
export class SelectMembersComponent extends UploadItemComponent implements OnDestroy {
  members: Member[] = [];
  activeMember: Member;
  subscription: Subscription;

  constructor(private roomService: RoomService) {
    super();
    this.members = this.roomService.room.value.members;
    this.subscription = this.roomService.room.subscribe(room => this.members = room.members);
   }

  checkValidation() {
    this.valid.next(this.activeMember !== undefined);
  }

  setActiveUser(member) {
    this.activeMember = member;
    this.payment.member = this.activeMember;
    this.paymentChanged.next(this.payment);
    this.valid.next(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
