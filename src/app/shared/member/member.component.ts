import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @Input('selected') selected = false;
  @Input('hoverable') hoverable = false;
  constructor() { }

  ngOnInit() {
  }

}
