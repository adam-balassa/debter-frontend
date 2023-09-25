import { Component, OnInit } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';
import { Split } from 'src/app/models/debter-interfaces.model';

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
  members: {id: string, name: string}[];

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.api.getMembers().then(members => {
      this.members = members;
      this.payment.split = this.members.map(m => ({ memberId: m.id, units: 1 }));
      this.checkValidation()
    });
  }

  checkValidation() {
    console.log("check")
    this.valid.next(this.payment.split.length > 0);
  }
}
