import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({ height: 0}), animate(200)
      ]),
      transition('* => void', [
        animate(200), style({ height: 0})
      ])
    ])
  ]
})
export class SelectComponent<T extends string | number> implements OnInit {
  collapsed = false;
  @Input('values') values: T[] = [];
  @Output('selected') selected: EventEmitter<T> = new EventEmitter<T>();
  @Input() selectedItem = 0

  constructor() { }

  ngOnInit() {
    //this.selected.next(this.values[this.selectedItem])
  }

  newValue(index: number){
    this.selectedItem = index;
    this.selected.next(this.values[this.selectedItem])
    this.collapse()
  }

  collapse(){
    this.collapsed = !this.collapsed;
  }

}
