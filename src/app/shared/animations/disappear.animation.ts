import { Component , HostBinding } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: '[disappearAnimation]',
  template: '<ng-content></ng-content>',
  styles: [],
  animations: [
    trigger('disappear', [
      transition('* => void', [
        animate('150ms ease-in'), 
        style({height: '0em', opacity: 0, transform: 'translateX(2rem)'})])
      ])
  ] 
})
export class DisappearAnimation {
  constructor() { }
  @HostBinding('@disappear') trigger = '';

}
