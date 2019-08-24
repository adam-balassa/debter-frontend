import { Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter, OnDestroy, ViewContainerRef } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
interface PopUpContent {
  title: string;
  content: string;
}

@Component({
  selector: 'app-popup-box',
  templateUrl: './popup-box.component.html',
  styleUrls: ['./popup-box.component.css'],
  animations: [
    trigger('appear', [
      transition('void => *', [style({ opacity: 0 }), animate(200)])
    ]),
    trigger('disappear', [
      transition('* => void', [
        animate(200),
        style({ opacity: 0 })
      ])
    ])
  ]
})
export class PopupBoxComponent implements OnInit, OnDestroy {

  isDisplayed: boolean;
  @Input('displayed') set displayed(value: boolean) {
    if (this.isDisplayed == value) return;
    this.isDisplayed = value;
    this.displayedChange.emit(value);
  }
  get displayed(): boolean {
    return this.isDisplayed;
  }
  @Output('displayedChange') displayedChange = new EventEmitter<boolean>()
  @Input('content') content: PopUpContent;
  @Output('textChosen') chosenText: EventEmitter<string> = new EventEmitter<string>();
  positioned: boolean = false;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.positioned = false;
  }

  @HostListener('document:click', ['$event'])
  clicked(event) {
    this.setPosition(event.x, event.y);
  }

  onNoteTextClick(text: string) {
    this.chosenText.emit(text);
  }

  setPosition(x: number, y: number) {
    if (this.positioned || !this.displayed) return;

    this.element.nativeElement.children[0].style.top = y - 16 + 'px';
    this.element.nativeElement.children[0].style.left = x + 'px';
    this.positioned = true;
  }
}
