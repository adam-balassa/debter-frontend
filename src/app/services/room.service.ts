import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Room, Member, Payment, Arrangement } from '../models/debter.model';
import { Request } from '../models/request.model';
import { HttpClient } from '@angular/common/http';
import { FullRoomData, RoomDetails, UploadableMembers, UploadablePayment } from '../models/shared-interfaces.model';
import { UploadingPayment } from '../core/upload/upload.component';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: BehaviorSubject<Room> = new BehaviorSubject({
    payments: [],
    members: [],
    mainCurrency: 'HUF',
    rounding: 1,
    roomKey: '',
    name: ''
  });

  constructor(private http: HttpClient) { }

  public joinRoom(roomKey: string): Promise<Room> {
    const room: Room = this.room.value;
    return new Request<RoomDetails>(this.http).patch('/room/login', { roomKey })
    .then<Room>((roomDetails: RoomDetails): Room => {
      const newRoom: Room = {
        ...room,
        roomKey,
        name: roomDetails.name,
        rounding: roomDetails.rounding,
        mainCurrency: roomDetails.defaultCurrency
      };
      this.room.next(newRoom);
      return newRoom;
    });
  }

  public createRoom(name: string): Promise<Room> {
    return new Request<RoomDetails>(this.http).post('/room', { roomName: name })
    .then<Room>(details => {
      const newRoom: Room = { ...details, ...this.room.value, mainCurrency: details.defaultCurrency, roomKey: details.key };
      this.room.next(newRoom);
      return newRoom;
    });
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

  public addMembersToRoom(memberNames: string[]): Promise<any> {
    const data: UploadableMembers = {
      roomKey: this.room.value.roomKey,
      members: memberNames
    };
    return new Promise(resolve => {
      new Request(this.http).post('/room/members', data)
      .then(() => { this.joinRoom(data.roomKey).then(() => { resolve(); }); });
    });
  }

  public uploadNewPayment(payment: UploadingPayment): Promise<any> {
    const data: UploadablePayment = {
      value: payment.value,
      memberId: payment.member.id,
      currency: payment.currency,
      note: payment.note,
      roomKey: this.room.value.roomKey,
      included: payment.included.map<string>(member => member.id)
    };
    return new Request(this.http).post('/payment', data)
    .then(() => { this.loadRoomDetails(); });
  }

  public deletePayment(payment: Payment): Promise<any> {
    return new Request(this.http).delete(`/room/${this.room.value.roomKey}/payment/${payment.id}`)
    .then(() => payment.active = false);
  }

  public revivePayment(payment: Payment): Promise<any> {
    return new Request(this.http).patch(`/room/${this.room.value.roomKey}/payment/${payment.id}`)
    .then(() => payment.active = true);
  }

  public arrangeDebt(debt: Arrangement): Promise<any> {
    return this.uploadNewPayment({
      value: debt.value,
      member: debt.from,
      currency: debt.currency,
      included: [debt.to],
      note: `${debt.from.name} arranged their debt with ${ debt.to.name }`
    });
  }

  public setRounding(rounding: number): Promise<any> {
    return new Request(this.http).patch('/settings/rounding', { rounding, roomKey: this.room.value.roomKey });
  }

  public setMainCurrency(mainCurrency: string) {
    return new Request(this.http).patch('/settings/currency', { mainCurrency, roomKey: this.room.value.roomKey });
  }

  public reset() {
    this.room.next({
      payments: [],
      members: [],
      mainCurrency: 'HUF',
      rounding: 1,
      roomKey: '',
      name: ''
    });
  }
}
