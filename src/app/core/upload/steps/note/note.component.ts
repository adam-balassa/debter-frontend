import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadItemComponent } from '../../upload-item/upload-item.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent extends UploadItemComponent implements OnInit {

  @ViewChild('noteForm', { static: true }) noteForm;
  constructor() {
    super();
  }

  checkValidation() {
    this.valid.emit(this.noteForm.valid);
  }

  setNote(value: string) {
    this.payment.note = value;
    this.paymentChanged.next(this.payment);
    this.checkValidation();
  }

  ngOnInit() {
  }

}
