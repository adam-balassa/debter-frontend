import { Component, OnInit, Output, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Output() clicked: EventEmitter;
  @Input() color: string = '#e67b82';
  @Input('hover') hoverColor: string = '#c26168';
  @Input() disabled = false;
  @Input('absolute') absolute: boolean = false;


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

  private paintButton(){
    this.button.style.backgroundColor = this.color;
    this.button.style.boxShadow = '2px 2px 10px -3px' + this.color;
    this.button.onmouseover = e => {
      this.button.style.backgroundColor = this.hoverColor;
      this.button.style.boxShadow = '2px 2px 10px -3px' + this.hoverColor;
    }
    this.button.onmouseleave = e => {
      this.button.style.backgroundColor = this.color;
      this.button.style.boxShadow = '2px 2px 10px -3px' + this.color;
    }
  }

}
