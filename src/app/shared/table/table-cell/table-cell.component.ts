import { Component, OnInit, Input, ElementRef } from '@angular/core';

export interface CellConfig {
  ratio: number;
  align: string;
  class: string;
}

@Component({
  selector: 'table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

export class TableCellComponent implements OnInit {
  @Input('config') cellConfiguration: CellConfig;

  constructor(private element: ElementRef) { }

  ngOnInit() {    
    this.element.nativeElement.style.flex = this.cellConfiguration.ratio
  }

}
