import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('disappear', [
      transition('* => void',[ animate(200), style({opacity: 0}) ])
    ])
  ]
})
export class LoadingComponent implements OnInit {

  @Input('loading') displayed;
  constructor() { }

  ngOnInit() {
  }

}
