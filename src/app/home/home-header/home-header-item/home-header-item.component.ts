import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home-header-item',
  templateUrl: './home-header-item.component.html',
  styleUrls: ['./home-header-item.component.css']
})
export class HomeHeaderItemComponent implements OnInit {
  @Input('url') url: string;

  constructor() { }

  ngOnInit() {
  }

}
