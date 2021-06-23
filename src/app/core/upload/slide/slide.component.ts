import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { compileInjectable } from '@angular/compiler';

const duration = 300;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({
        opacity: 0,
        transform: 'translateX(-20vw)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('right', style({
        opacity: 0,
        transform: 'translateX(20vw)'
      })),
      transition('* <=> in', [animate(duration + 'ms ease-in')])
    ])
  ]
})
export class SlideComponent implements OnInit {
  state: string;
  displayed: boolean = false;

  @Input('slideSequence') slideSequence: number;
  @Input('activeSlide') set activeSlide(activeSlide: number){
    activeSlide == this.slideSequence ? this.comeIn(activeSlide) : this.goOut(activeSlide);
  };

  constructor() { }

  comeIn(activeSlide: number){
    this.displayed = true;
    setTimeout(e => {
      this.state = 'in'
    }, duration)
  }

  goOut(activeSlide: number){
    if(activeSlide < this.slideSequence) this.state = 'right'
    else this.state = 'left'

    setTimeout(e => {
      this.displayed = false;
    }, duration)
  }

  ngOnInit() {

  }

}
