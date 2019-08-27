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
    {align: 'left', ratio: 1},
    {align: 'right', ratio: 2},
    {align: 'right', ratio: 2, class: 'pink'}];

  tableHeaderTemplate = [
    {align: 'left', ratio: 1},
    {align: 'right', ratio: 2},
    {align: 'right', ratio: 2}
  ];

  tableLabels = ['Name', 'Payed', 'Debt'];
  members: (Member & {sum: number, debt: number})[] = [];
  sum: number = 0;
  loading: boolean = true;
  shown: boolean = false;
  subscription: Subscription;

  constructor(private project: RoomService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.project.room.subscribe(room => {
      if (room.members.length > 0) {
        this.members = room.members.map<Member&{sum: number, debt: number}>((member: Member) => ({
          ...member,
          sum: 0,
          debt: 0
        }));
        this.members.forEach((member, i) =>
          member.debts.forEach(debt => {
            this.members[i].debt += debt.value;
            this.members.find(m => debt.to.id === m.id).debt -= debt.value;
        }));
        room.payments.forEach(payment => {
          this.members.find(member => member.id === payment.member.id).sum += payment.realValue;
          this.sum += payment.realValue;
        });
        this.loading = false;
      }
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
