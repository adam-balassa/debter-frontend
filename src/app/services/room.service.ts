import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Room, Member, Payment } from '../models/debter.model';
import { Request } from '../models/request.model';
import { HttpClient } from '@angular/common/http';
import { FullRoomData } from '../models/shared-interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: BehaviorSubject<Room> = new BehaviorSubject({
    payments: [],
    members: [],
    mainCurrency: 'HUF',
    rounding: 1,
    roomKey: 'CHOPOK',
    name: ''
  });

  constructor(private http: HttpClient) { }

  public joinRoom() {

  }

  public createRoom() {

  }

  public loadRoomDetails(): Promise<Room> {
    const { roomKey } = this.room.value;
    const room: Room = this.room.value;
    return new Request<FullRoomData>(this.http).get(`/room/${roomKey}`)
    .then<Room>((roomData: FullRoomData): Room => {
      room.members = roomData.members.map<Member>(member => ({...member, debts: [], sum: 0, debt: 0}));

      room.payments = roomData.payments.map<Payment>(payment => ({
        value: payment.value, currency: payment.currency, realValue: payment.realValue, id: payment.id, note: payment.note,
        date: new Date(payment.date), active: payment.active,
        excluded: (payment.included.length === 0 ?
          room.members.filter(member => payment.excluded.includes(member.id)) :
          room.members.filter(member => !payment.included.includes(member.id))),
        member: room.members.find(member => member.id === payment.memberId)
      }));
      let i = room.payments.length;
      while (i--) {
        const payment = room.payments[i];
        if (payment.value < 0) {
          room.payments.splice(i, 1);
          room.payments.find(p => p.id === payment.note).excluded = room.members.filter(member => member !== payment.member);
        }
      }
      room.payments.forEach(payment => payment.member.sum += payment.realValue);

      roomData.debts.forEach(debt => {
        const from = room.members.find(member => debt.from === member.id);
        const to = room.members.find(member => debt.for === member.id);
        from.debts.push({ from, to, value: debt.value, currency: debt.currency, arranged: debt.arranged });
        from.debt += debt.value;
        to.debt -= debt.value;
      });
      this.room.next(room);
      return room;
    });
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
