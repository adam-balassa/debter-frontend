import { Component, HostBinding } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: '[appearAnimation]',
  template: '<ng-content></ng-content>',
  styles: [],
  animations: [
    trigger('appear', [
      transition('void => *', [
        style({height: '0em', opacity: 0}),
        animate('150ms ease-in')])
    ])
  ] 
})
export class AppearAnimation {
  constructor() { }
  @HostBinding('@appear') trigger = '';

}
