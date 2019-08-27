import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Member } from 'src/app/models/debter.model';

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

  slides = ['Who payed?', 'How much?', 'Add note', 'Who\'s included?'];
  activeSlide = 0;
  mayContinue: boolean = false;
  payment: UploadingPayment;
  loading: boolean = false;
  message = {
    content: '',
    alert: false,
    header: '',
    displayed: false
  };

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    this.payment = {
      value: 0,
      member: null,
      note: '',
      currency: 'HUF',
      included: []
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
    this.roomService.uploadNewPayment();
  }

  redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
