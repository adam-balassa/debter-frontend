import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieManager } from './../../services/cookie-manager.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('createForm') form;
  username: string;
  message = 'Room id must be at least 6 characters';
  error = false;
  constructor(
    private router: Router,
    private cookieService: CookieManager) { }

  ngOnInit() {
  }

  createRoom(title: string) {
    if (this.form.invalid) return;
  }

}
