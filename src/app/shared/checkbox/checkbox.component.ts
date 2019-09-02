import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  check() {
    this.checked = !this.checked;
    this.checkedChange.next(this.checked);
  }

}
