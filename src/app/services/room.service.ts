import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Room } from '../models/debter.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: Subject<Room> = new BehaviorSubject({
    payments: [],
    members: [],
    mainCurrency: 'HUF',
    rounding: 1,
    roomKey: '',
    name: ''
  });

  constructor() { }

  public joinRoom() {

  }

  public createRoom() {

  }

  public loadRoomDetails() {

  }

  public uploadNewPayment() {

  }

  public deletePayment() {

  }

  public revivePayment() {

  }

  public arrangeDebt() {

  }
}
