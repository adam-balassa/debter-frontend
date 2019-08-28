import { Component, OnInit } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
  animations: [
    trigger('alert', [
      state('displayed', style({ width: 'calc(100% - 4rem)'})),
      state('hidden', style({width: '100%'})),
      transition('hidden <=> displayed', animate(300))
    ])
  ]
})
export class ValueComponent extends UploadItemComponent implements OnInit {
  valueForm: FormGroup;
  readonly currencies = ['HUF', 'EUR', 'USD'];
  initialCurrency: number;
  constructor() {
    super();
    this.valueForm = new FormGroup({
      'value': new FormControl('', [
        Validators.required,
        this.isNumber
      ])
    });
  }

  checkValidation() {
    this.valid.next(
      this.valueForm.valid
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.initialCurrency = this.currencies.indexOf(this.payment.currency);
  }

  isNumber (control: FormControl): {[key: string]: boolean} {
    const num: number = Number.parseFloat(control.value);
    // tslint:disable-next-line: triple-equals
    if (Number.isNaN(num) || num != control.value)
      return { NaN: true };
    return null;
  }

  setAmount() {
    const amount = Number.parseFloat(this.valueForm.value.value);
    this.payment.value = amount;
    this.paymentChanged.next(this.payment);
    this.checkValidation();
  }

  setCurrency(currency: string) {
    this.payment.currency = currency;
    this.paymentChanged.next(this.payment);
    this.checkValidation();
  }

}
