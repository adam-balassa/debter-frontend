import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RoomSummary } from 'src/app/models/debter-interfaces.model';
import { CookieManager } from 'src/app/services/cookie-manager.service';

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
  roomSummary: RoomSummary = { roomKey: '', name: '', sum: 0.0, currency: '', memberSummary: [] };
  loading: boolean = true;
  shown: boolean = false;

  constructor(public api: ApiService, private cookie: CookieManager) {
  }

  async ngOnInit() {
    this.roomSummary = await this.api.getRoomSummary();
    this.cookie.addRoom(this.roomSummary.roomKey, this.roomSummary.name);
    this.loading = false;
  }

  copy() {
    this.projectIdInput.nativeElement.focus();
    this.projectIdInput.nativeElement.select();
    document.execCommand('copy');
    this.shown = true;
    this.projectIdInput.nativeElement.blur();
  }
}
