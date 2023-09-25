import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equal-unequal',
  templateUrl: './equal-unequal.component.html',
  styleUrls: ['./equal-unequal.component.css']
})
export class EqualUnequalComponent implements OnInit {

  isEqualSelected: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
