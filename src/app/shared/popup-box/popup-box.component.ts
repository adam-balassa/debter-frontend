import { Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter, OnDestroy, ViewContainerRef } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
interface PopUpContent {
  title: string;
  content: {name: string; value: string}[];
}

@Component({
  selector: 'app-popup-box',
  templateUrl: './popup-box.component.html',
  styleUrls: ['./popup-box.component.css'],
  animations: [
    trigger('disappear', [
      transition('* => void', [
        animate(200),
        style({ opacity: 0 })
      ]),
      transition('void => *', [style({ opacity: 0 }), animate(200)])
    ])
  ]
})
export class PopupBoxComponent implements OnInit, OnDestroy {

  @Input('displayed') displayed: boolean;
  @Input('content') content: PopUpContent;
  @Output('textChosen') chosenText: EventEmitter<string> = new EventEmitter<string>();
  @Output('disappeared') disappeared: EventEmitter<void> = new EventEmitter<void>();
  positioned: boolean = false;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.positioned = false;
  }

  onNoteTextClick(text: string) {
    this.chosenText.emit(text);
  }

  hide() {
    this.displayed = false;
    this.disappeared.next();
  }
}
