import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellConfig } from '../table-cell/table-cell.component'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  animations: [
    trigger ('appear', [
      transition('void => *', [
        style({height: 0}), animate('200ms ease-out')
      ])
    ]),
    trigger ('disappear', [
      transition('* => void', [
        animate('200ms ease-out'), style({height: 0})
      ])
    ])
  ]
})
export class TableRowComponent implements OnInit {

  @Input('cellsTemplate') cellTemplates: CellConfig[];
  @Input('cells') rowCells: string[];
  @Input('collapsable') collapsable: boolean = false;
  @Output('cellClicked') clickEvent = new EventEmitter<number>();
  clickedCell: number = null;
  @Input() collapsed: boolean = false;
  constructor() {
  }

  ngOnInit() {
        
  }

  collapse(){
    this.collapsed = this.collapsable && !this.collapsed;    
  }

  cellClicked(n: number){
    this.clickEvent.emit(n);
    this.clickedCell = n;
  }

}
