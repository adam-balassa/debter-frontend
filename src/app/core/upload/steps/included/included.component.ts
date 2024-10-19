import { Component, OnInit } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';
import {Split} from '../../../../models/debter-interfaces.model';

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
  members: {id: string, name: string}[] = [];
  isEqualSelected: boolean = true;
  isValid: boolean = true;

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.api.getMembers().then(members => {
      this.members = members;
      this.payment.split = this.members.map(m => ({ memberId: m.id, units: 1 }));
      this.checkValidation();
    });
  }

  onTabSelectionChange() {
    this.isEqualSelected = !this.isEqualSelected;
    this.onSplitChange(this.payment.split);
  }

  onSplitChange(split: Split[]) {
    const nextSplit = split.filter(s => s.units > 0);
    this.isValid = nextSplit.length > 0;
    this.valid.next(this.isValid);
    this.paymentChanged.emit({ ...this.payment, split: nextSplit });
  }

  checkValidation() {
    return this.isValid;
  }
}
