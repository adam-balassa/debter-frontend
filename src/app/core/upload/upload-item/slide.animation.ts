import { trigger, transition, style, animate } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  transition('void => *', [
    style({transform: 'translateX(20vw)', opacity: 0}),
    animate('300ms ease-in')])
]);

export const slideOut = trigger('slideOut', [
    transition('* => void', [
        animate('300ms ease-in'),
        style({transform: 'translateX(-20vw)', opacity: 0})
    ])
]);
