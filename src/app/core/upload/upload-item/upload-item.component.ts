import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate } from '@angular/animations';
import { UploadingPayment } from '../upload.component';

@Component({
  selector: 'app-upload-item',
  template: '<ng-content></ng-content>',
  styles: [],
  animations: [
    trigger('slideIn', [
      transition('void => *', [
        animate(200)
      ])
    ]),
    trigger('slideOut', [
      transition('* => void', [
        animate(200)
      ])
    ])
  ]
})
export class UploadItemComponent implements OnInit {

  @Input('payment') payment: UploadingPayment;
  @Output('paymentChange') paymentChanged = new EventEmitter<UploadingPayment>();
  @Output('valid') valid = new EventEmitter<boolean>();
  @Input('rendered') set displayed(param: boolean) {
    if (param) this.checkValidation();
  }

  constructor() { }

  ngOnInit() {}

  checkValidation() {}

}
