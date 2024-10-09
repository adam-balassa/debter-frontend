import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface HeaderItem {
  title: string;
  routerLink: string;
}

@Component({
  selector: 'app-header-phone',
  templateUrl: './header-phone.component.html',
  styleUrls: ['./header-phone.component.css']
})
export class HeaderPhoneComponent implements OnInit, OnDestroy {

  @Input('items') items: HeaderItem[];
  @ViewChild('check', { static: true }) check;
  @ViewChild('menu') menu;
  @ViewChild('nav', { static: true }) nav;
  open: boolean;
  subscription: Subscription;
  constructor(private router: Router) { }

  ngOnInit() {
    this.subscription =
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {this.open = false; });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
