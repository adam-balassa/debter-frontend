import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { RoomSummary } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('projectIdInput', { static: true }) projectIdInput: ElementRef;
  tableTemplate = [
    {align: 'left', ratio: 3},
    {align: 'right', ratio: 2},
    {align: 'right', ratio: 2, class: 'pink'}];

  tableHeaderTemplate = [
    {align: 'left', ratio: 3},
    {align: 'right', ratio: 2},
    {align: 'right', ratio: 2}
  ];

  tableLabels = ['Name', 'Paid', 'Debt'];
  roomSummary: Observable<RoomSummary>;
  loading: boolean = true;
  shown: boolean = false;

  constructor(public api: ApiService) {
  }

  ngOnInit() {
    this.roomSummary = this.api.getRoomSummary();
  }

  copy() {
    this.projectIdInput.nativeElement.focus();
    this.projectIdInput.nativeElement.select();
    document.execCommand('copy');
    this.shown = true;
    this.projectIdInput.nativeElement.blur();
  }
}
