import { Component, OnInit, Input } from '@angular/core';
import { GetPaymentResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input('payment') payment: GetPaymentResponse;
  constructor() {}

  ngOnInit() {
  }

}
