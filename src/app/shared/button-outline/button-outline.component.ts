import { Component, OnInit, Output, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-button-outline',
  templateUrl: './button-outline.component.html',
  styleUrls: ['./button-outline.component.css']
})
export class ButtonOutlineComponent implements OnInit {
  @Output() clicked: EventEmitter;
  @Input() color: string = '#e67b82';
  private white: string = '#f2f0f6';

  private button: HTMLElement;

  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    this.button = this.getButtonElement();
    this.paintButton();
  }

  private getButtonElement(): HTMLElement {
    return this.element.nativeElement.children[0].children[0]
  }

  private paintButton() {
    this.button.style.color = this.button.style.borderColor = this.color;
    this.button.style.backgroundColor = this.white;
    this.button.onmouseover = e => {
      this.button.style.color = this.button.style.borderColor = this.white;
      this.button.style.backgroundColor = this.color;
    };
    this.button.onmouseleave = e => {
      this.button.style.color = this.button.style.borderColor = this.color;
      this.button.style.backgroundColor = this.white;
    };
  }

}
