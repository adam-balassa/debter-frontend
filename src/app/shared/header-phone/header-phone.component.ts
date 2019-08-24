import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

interface HeaderItem{
  title: string;
  routerLink: string;
}

@Component({
  selector: 'app-header-phone',
  templateUrl: './header-phone.component.html',
  styleUrls: ['./header-phone.component.css']
})
export class HeaderPhoneComponent implements OnInit {

  @Input('items') items: HeaderItem [];
  @ViewChild('check') check;
  @ViewChild('menu') menu;
  @ViewChild('nav') nav;

  constructor() { }

  ngOnInit() {
    
  }

  @HostListener('document:click', ['$event'])
  close(event){
    if(this.check.nativeElement.checked){
      if(!this.nav.nativeElement.contains(event.target) || 
      this.menu.nativeElement.contains(event.target) && this.menu.nativeElement != event.target)
        this.check.nativeElement.checked = false;
    }
  }

}
