import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('show', [
      transition('* => void', [
        animate('200ms ease'),
        style( { opacity: 0, transform: 'scale(.9)' } )
      ]),
      transition('void => *', [
        style( { opacity: 0, transform: 'scale(.9)' } ),
        animate('200ms ease'),
        style( { opacity: 1, transform: 'scale(1)' } )
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  displayed: boolean = false;
  @Input() interval = 1200;
  @Input() set show (value: boolean) {
    if (!value) return;
    this.displayed = true;
    setTimeout(() => { this.hide(); }, this.interval);
  }
  @Output() showChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.displayed = false;
    this.show = false;
    this.showChange.next(false);
  }

}
