import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieManager } from './../../services/cookie-manager.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/debter.model';

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
    private roomService: RoomService,
    private cookieService: CookieManager) { }

  ngOnInit() {
  }

  createRoom(title: string) {
    if (this.form.invalid) return;
    this.roomService.createRoom(title)
    .then((room: Room) => {
      this.cookieService.fetchProjectId(room.roomKey);
      this.router.navigateByUrl(`/room/${room.roomKey}/members`);
    })
    .catch(error => { this.error = true; this.message = error; });
  }

}
