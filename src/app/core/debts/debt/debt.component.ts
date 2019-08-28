import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Arrangement } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

  @Input() debt: Arrangement;
  @Output() done = new EventEmitter<void>();

  constructor(public roomService: RoomService) { }

  ngOnInit() {
  }

}
