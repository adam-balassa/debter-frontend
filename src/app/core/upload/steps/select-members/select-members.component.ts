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
  activeUser: Member;
  subscription: Subscription;

  constructor(private roomService: RoomService) {
    super();
    this.subscription = this.roomService.room.subscribe(room => this.members = room.members);
   }

  checkValidation() {
    this.valid.next(this.activeUser !== undefined);
  }

  setActiveUser(user) {
    this.activeUser = user;
    this.payment.member = this.activeUser;
    this.paymentChanged.next(this.payment);
    this.valid.next(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
