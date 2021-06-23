import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddUserService } from '../../../services/add-user.service';
import { Payment } from 'src/app/models/debter.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit, OnDestroy {

  payments: Payment[];
  selectedPayments: Payment[] = [];
  subscription: Subscription;
  loading = false;
  readonly template = [
    { align: 'left', ratio: 1 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];
  constructor(
    public addUserService: AddUserService,
    private router: Router,
    private link: ActivatedRoute) { }

  ngOnInit() {
    // this.payments = this.roomSerice.room.value.payments;
    // this.subscription = this.roomSerice.room.subscribe(room => this.payments = room.payments);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  select(payment: Payment, select: boolean) {
    if (select) {
      if (!this.selectedPayments.includes(payment)) this.selectedPayments.push(payment);
    } else {
      if (this.selectedPayments.includes(payment))
        this.selectedPayments.splice(this.selectedPayments.findIndex(p => p === payment), 1);
    }
  }

  selectAll() {
    this.selectedPayments = [...this.payments];
  }

  deselectAll() {
    this.selectedPayments = [];
  }

  save() {
    this.loading = true;
    // this.roomSerice.addNewMember(this.addUserService.name, this.selectedPayments)
    // .then(() => { this.loading = false; this.router.navigate(['../../'], {relativeTo: this.link}); });
  }
}
