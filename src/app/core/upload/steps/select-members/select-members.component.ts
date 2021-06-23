import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.css']
})
export class SelectMembersComponent extends UploadItemComponent implements OnInit {
  members: {id: string, name: string}[] = [];
  activeMemberId: string;

  constructor(private api: ApiService) {
    super();
   }

   async ngOnInit() {
    this.members = await this.api.getMembers();
   }

  checkValidation() {
    this.valid.next(this.activeMemberId !== undefined);
  }

  setActiveUser(member: {id: string, name: string}) {
    this.activeMemberId = member.id;
    this.payment.memberId = this.activeMemberId;
    this.paymentChanged.next(this.payment);
    this.valid.next(true);
  }

}
