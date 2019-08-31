import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/debter.model';
import { RoomService } from 'src/app/services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('projectIdInput') projectIdInput: ElementRef;
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
  members: Member[] = [];
  sum: number = 0;
  loading: boolean = true;
  shown: boolean = false;
  subscription: Subscription;

  constructor(public project: RoomService) {
  }

  ngOnInit() {
    this.project.loadRoomDetails().then(result => { this.loading = false; });
    this.subscription = this.project.room.subscribe(room => {
      this.members = room.members;
      this.sum = this.members.reduce((sum, next) => sum + next.sum, 0);
    });
  }

  copy() {
    this.projectIdInput.nativeElement.focus();
    this.projectIdInput.nativeElement.select();
    document.execCommand('copy');
    this.shown = true;
    this.projectIdInput.nativeElement.blur();
  }


  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
