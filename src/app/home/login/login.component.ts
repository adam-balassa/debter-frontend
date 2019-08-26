import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieManager } from './../../services/cookie-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() submitted: EventEmitter;
  popup: boolean = false;
  constructor(private cookieManager: CookieManager) { }
  form: FormGroup;
  message = '';
  projectIds: string[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.projectIds = this.cookieManager.loadProjectIds();
    this.form = new FormGroup({
      roomIdInput: new FormControl('', [Validators.maxLength(6), Validators.minLength(6), Validators.required]),
      submit: new FormControl(null)
    });
  }

  join() {
    if (this.form.invalid) return;
    this.loading = true;
    const roomId = this.form.value.roomIdInput;
    // TODO: Login
  }

  onIdChosen(roomId: string) {
    this.popup = false;
    this.form.patchValue({
      roomIdInput: roomId
    });
    this.form.updateValueAndValidity();
  }
}
