import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Member } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-included',
  templateUrl: './included.component.html',
  styleUrls: ['./included.component.css'],
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0, opacity: 0}), animate(200)
      ]),
      transition('* => void', [
        animate(200), style({height: 0, opacity: 0})
      ])
    ])
  ]
})
export class IncludedComponent extends UploadItemComponent implements OnInit, OnDestroy {
  everybodyIncluded: boolean = true;
  selectedMembers: Member[] = [];
  members: Member[] = [];
  subscription: Subscription;

  constructor(private roomService: RoomService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.roomService.room.subscribe(room => {
      this.members = room.members;
      this.payment.included = this.members;
    });
  }

  checkValidation() {
    this.valid.next(this.everybodyIncluded || this.selectedMembers.length > 0);
  }

  everybodyIncludedToggle() {
    this.everybodyIncluded = !this.everybodyIncluded;
    this.payment.included = this.everybodyIncluded ? this.members : this.selectedMembers;
    this.checkValidation();
  }

  selectMember(member: Member) {
    if (this.selectedMembers.includes(member))
      this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1);
    else
      this.selectedMembers.push(member);
    this.payment.included = this.selectedMembers;
    this.paymentChanged.next(this.payment);
    this.checkValidation();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
