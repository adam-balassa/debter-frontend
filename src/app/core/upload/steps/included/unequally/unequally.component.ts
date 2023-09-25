import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Split } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-unequally',
  templateUrl: './unequally.component.html',
  styleUrls: ['./unequally.component.css']
})
export class UnequallyComponent implements OnInit {

  @Input() members: {id: string, name: string}[];
  @Input() split: Split[];
  @Output() splitChange = new EventEmitter<Split[]>();
  
  constructor() { }

  ngOnInit() {
  }

}
