import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
const interval = 200;
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  animations: [
    trigger('appear', [
      transition('void => *', [
        style({transform: 'translateY(-100px)', opacity: 0}),
        animate(interval)
      ])
    ]),
    trigger('disappear', [
      transition('* => void', [
        animate(interval),
        style({transform: 'translateY(-100px)', opacity: 0})
      ])
    ])
  ]
})
export class MessageBoxComponent implements OnInit {

  @Output('finished') finished = new EventEmitter<null>()

  private isDisplayed = false;

  @Input('displayed')
  set displayed(value: boolean){    
    if(!value && this.isDisplayed)
      setTimeout(e => {        
        this.finished.next()
      }, interval)
      
    this.isDisplayed = value;
  }

  @Input() header: string;
  @Input() content: string;
  @Input() alert: boolean = false;

  get displayed (): boolean{
    return this.isDisplayed;
  }

  constructor() { }

  ngOnInit() {
  }

}
