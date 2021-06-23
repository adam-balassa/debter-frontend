import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieManager } from './../../services/cookie-manager.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/debter.model';
import { ApiService } from 'src/app/services/api.service';
import { CreateRoomResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('createForm', { static: true }) form;
  username: string;
  message = 'Title must be at least 6 characters';
  error = false;
  constructor(
    private router: Router,
    private api: ApiService,
    private cookieService: CookieManager) { }

  ngOnInit() {
  }

  createRoom(title: string) {
    if (this.form.invalid) return;
    this.api.createRoom(title)
    .then(room => {
      console.log(room);
      this.cookieService.addRoom(room.roomKey, title);
      this.router.navigateByUrl(`/room/${room.roomKey}/members`);
    })
    .catch(error => { this.error = true; this.message = error; });
  }

}
