import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Split } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-equally',
  templateUrl: './equally.component.html',
  styleUrls: ['./equally.component.css']
})
export class EquallyComponent implements OnInit {

  @Input() members: {id: string, name: string}[];
  @Input() split: Split[];
  @Output() splitChange = new EventEmitter<Split[]>();

  constructor() { }

  ngOnInit() {
  }

  memberIncluded (member: { id: string }) {
    return this.split.find(m => m.memberId === member.id)
  }


  toggle({ id }: { id: string }) {
    const idx = this.split.findIndex(m => m.memberId === id)
    if(idx === -1) {
      this.split.push({ memberId: id, units: 1 })
    } else {
      this.split.splice(idx, 1);
    }
    this.splitChange.next(this.split);
  }
}
