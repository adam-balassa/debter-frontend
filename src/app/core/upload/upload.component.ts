import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/debter.model';
import { ApiService } from 'src/app/services/api.service';
import { AddPaymentRequest } from 'src/app/models/debter-interfaces.model';

export interface UploadingPayment {
  value: number;
  included: Member[];
  member: Member;
  note: string;
  currency: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  slides = ['Who paid?', 'How much?', 'Add note', 'Who\'s included?'];
  activeSlide = 3;
  mayContinue: boolean = false;
  payment: AddPaymentRequest;
  loading: boolean = false;
  message = {
    content: '',
    alert: false,
    header: '',
    displayed: false
  };

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.payment = {
      value: 0,
      memberId: '',
      note: '',
      currency: 'HUF',
      split: []
    };
  }

  next() {
    if (!this.mayContinue) return;
    this.activeSlide++;
  }

  back() {
    this.activeSlide--;
  }

  finished() {
    if (!this.mayContinue) return;
    this.loading = true;
    this.api.uploadPayment(this.payment)
    .then(() => { this.router.navigate(['../'], { relativeTo: this.route }); });
  }

  redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
