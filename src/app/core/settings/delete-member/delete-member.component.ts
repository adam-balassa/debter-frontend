import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';
import { ApiService } from 'src/app/services/api.service';
import { GetPaymentResponse } from 'src/app/models/debter-interfaces.model';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css']
})
export class DeleteMemberComponent implements OnInit {
  members: {id: string, name: string}[] = [];
  payments: GetPaymentResponse[] = [];
  loading = false;
  readonly template = [
    { align: 'left', ratio: 1 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 3 },
    { align: 'left', ratio: 1 }
  ];
  constructor(
    private api: ApiService,
    public addUserService: AddUserService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.payments = (await this.api.getPayments()).activePayments;
    this.members = (await this.api.getMembers()).filter(m => this.payments.every(p =>
      p.memberName != m.name &&
      !p.split.find(i => i.memberName == m.name)));
  }


  removeMember({id}) {
    this.loading = true;
    this.api.deleteMember(id);
    this.loading = false;
    this.init();
  }
}
