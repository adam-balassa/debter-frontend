import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Split } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-equally',
  templateUrl: './equally.component.html',
  styleUrls: ['./equally.component.css']
})
export class EquallyComponent implements OnInit {

  @Input() members: {id: string, name: string}[];
  @Input() set split (value: Split[]) {
    this.includedMembers = value.filter(m => m.units > 0).map(m => m.memberId);
  }
  @Output() splitChange = new EventEmitter<Split[]>();

  includedMembers: string[] = [];

  constructor() { }

  ngOnInit() {
    this.splitChange.emit(
      this.members.map(m => ({
        memberId: m.id,
        units: this.includedMembers.includes(m.id) ? 1 : 0
      }))
    );
  }

  toggle({ id }: { id: string }) {
    if (this.includedMembers.includes(id)) {
      this.includedMembers = this.includedMembers.filter(m => m !== id);
    } else {
      this.includedMembers.push(id);
    }
    this.splitChange.next(
      this.members.map(m => ({
        memberId: m.id,
        units: this.includedMembers.includes(m.id) ? 1 : 0
      }))
    );
  }
}
