import { Component, OnInit, Input } from '@angular/core';
import { Member, Payment } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input('payment') payment: Payment;
  @Input('members') members: Member[];
  constructor(private room: RoomService) {}

  ngOnInit() {
  }

}
