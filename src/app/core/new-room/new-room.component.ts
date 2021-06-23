import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  members: string[] = [''];

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }

  addNewMember() {
    this.members.push('');
  }

  removeMember(index: number) {
    this.members.splice(index, 1);
  }

  save() {
    this.api.addMembers(this.members).then(() => { this.router.navigate(['../'], {relativeTo: this.activatedRoute}); });
  }
}
