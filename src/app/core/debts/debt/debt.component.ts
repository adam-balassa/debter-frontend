import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetDebtResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

  @Input() debt: GetDebtResponse;
  @Input() currency: string;
  @Output() done = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
