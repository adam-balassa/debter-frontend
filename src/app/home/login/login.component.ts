import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieManager } from './../../services/cookie-manager.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() submitted: EventEmitter;
  popup: boolean = false;
  constructor(private cookieManager: CookieManager, private api: ApiService, private router: Router) { }
  form: FormGroup;
  message = '';
  rooms: {roomKey: string, name: string}[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.rooms = this.cookieManager.loadRooms();
    this.form = new FormGroup({
      roomIdInput: new FormControl('', [Validators.maxLength(6), Validators.minLength(6), Validators.required]),
      submit: new FormControl(null)
    });
  }

  join() {
    if (this.form.invalid) return;
    this.loading = true;
    const roomKey = this.form.value.roomIdInput;
    this.api.roomKey = roomKey;
    this.api.getRoomSummary().then(() => {
      this.router.navigateByUrl(`/room/${roomKey}`);
    })
    .catch(error => {
      this.cookieManager.eraseRoom(roomKey);
      this.rooms = this.cookieManager.loadRooms();
      this.message = error;
      this.loading = false;
    });
  }

  onIdChosen(roomId: string) {
    this.popup = false;
    this.form.patchValue({
      roomIdInput: roomId
    });
    this.form.updateValueAndValidity();
  }
}
