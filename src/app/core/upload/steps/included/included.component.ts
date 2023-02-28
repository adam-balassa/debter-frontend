import { Component, OnInit } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

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
export class IncludedComponent extends UploadItemComponent implements OnInit {
  everybodyIncluded: boolean = true;
  selectedMembers: {id: string, name: string}[] = [];
  members: {id: string, name: string}[];

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.api.getMembers().then(members => {
      this.members = members;
      this.payment.split = this.members.map(m => ({ memberId: m.id, units: 1 }));
    });
  }

  checkValidation() {
    this.valid.next(this.everybodyIncluded || this.selectedMembers.length > 0);
  }

  everybodyIncludedToggle() {
    this.everybodyIncluded = !this.everybodyIncluded;
    this.payment.split = (this.everybodyIncluded ? this.members : this.selectedMembers).map(m => ({ memberId: m.id, units: 1 }));
    this.checkValidation();
  }

  selectMember(member: {id: string, name: string}) {
    if (this.selectedMembers.includes(member))
      this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1);
    else
      this.selectedMembers.push(member);
    this.payment.split = this.selectedMembers.map(m => ({ memberId: m.id, units: 1 }));
    this.paymentChanged.next(this.payment);
    this.checkValidation();
  }
}
