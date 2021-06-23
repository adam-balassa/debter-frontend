import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.css'],
  animations: [
    trigger('displayed', [
      transition('void => displayed', [
        style({ opacity: 0, width: '4rem' }),
        animate(150),
        style({ opacity: 0.8, width: 'fit-content' })
      ]),
      transition('displayed => void', [animate(150), style({ opacity: 0 })])
    ])
  ]
})
export class FormAlertComponent implements OnInit {

  private displayed: boolean = true;
  @ViewChild('icon', { static: false }) icon: ElementRef;
  @Input('message') msg: string;
  iconDisplayed: boolean;
  @Input('alerted') set alerted(alerted: boolean) {
    this.iconDisplayed = alerted;
    if (!alerted) return;
    else {
      setTimeout(e => {
        this.displayed = false;
      }, 1000);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
