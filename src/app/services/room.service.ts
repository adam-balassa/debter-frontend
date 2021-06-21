import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Room, Member, Payment, Arrangement } from '../models/debter.model';
import { HttpClient } from '@angular/common/http';
import { FullRoomData, RoomDetails, UploadableMembers,
  UploadablePayment, UploadableMember } from '../models/shared-interfaces.model';
import { UploadingPayment } from '../core/upload/upload.component';
import { CookieManager } from './cookie-manager.service';
import { environment } from 'src/environments/environment';

const API = environment.API;

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

  constructor(private http: HttpClient, private cookieManager: CookieManager) { }

  public getRoomName(roomKey: string): Promise<{roomKey: string, name: string}> {
    return this.http.get(`${API}/room/${roomKey}`)
      .toPromise().then<{ roomKey: string, name: string }>((roomDetails: RoomDetails): { roomKey: string, name: string } => {
        return { roomKey, name: roomDetails.name };
      });
  }

  public ping(): Promise<any> {
    return this.http.get(`${API}/actuator/health`).toPromise()
  }

  public joinRoom(roomKey: string): Promise<Room> {
    const room: Room = this.room.value;
    return this.http.get(`${API}/room/${roomKey}`).toPromise()
    .then<Room>((roomDetails: RoomDetails): Room => {
      const newRoom: Room = {
        ...room,
        roomKey,
        name: roomDetails.name,
        rounding: roomDetails.rounding,
        mainCurrency: roomDetails.defaultCurrency
      };
      this.cookieManager.addRoom(newRoom.roomKey, newRoom.name);
      this.room.next(newRoom);
      return newRoom;
    });
  }

  public createRoom(name: string): Promise<Room> {
    return this.http.post<RoomDetails>(`${API}/room`, { roomName: name }).toPromise()
    .then<Room>(details => {
      const newRoom: Room = { ...details, ...this.room.value, mainCurrency: details.defaultCurrency, roomKey: details.key };
      this.room.next(newRoom);
      return newRoom;
    });
  }

  public loadRoomDetails(): Promise<Room> {
    const { roomKey } = this.room.value;
    return this.http.get<FullRoomData>(`${API}/room/${roomKey}`).toPromise()
    .then<Room>((roomData: FullRoomData): Room => {
      return this.setRoomDetails(roomData);
    });
  }

  private setRoomDetails(roomData: FullRoomData) {
    const room: Room = this.room.value;

    room.name = roomData.name;
    room.rounding = roomData.rounding;
    room.mainCurrency = roomData.defaultCurrency;

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
    room.payments.forEach(payment => payment.member.sum += payment.realValue * (payment.active ? 1 : 0));
    room.members.forEach(member => member.sum = this.round(member.sum));

    roomData.debts.forEach(debt => {
      const from = room.members.find(member => debt.from === member.id);
      const to = room.members.find(member => debt.for === member.id);
      from.debts.push({ from, to, value: debt.value, currency: debt.currency, arranged: debt.arranged });
      from.debt += debt.value;
      to.debt -= debt.value;
    });
    this.room.next(room);
    return room;
  }

  public addMembersToRoom(memberNames: string[]): Promise<void> {
    const data: UploadableMembers = {
      members: memberNames
    };
    return new Promise(resolve => {
      this.http.post(`${API}/room/${this.room.value.roomKey}/members`, data).toPromise()
      .then(() => { this.joinRoom(this.room.value.roomKey).then(() => { resolve(); }); });
    });
  }

  public uploadNewPayment(payment: UploadingPayment): Promise<any> {
    const data: UploadablePayment = {
      value: payment.value,
      memberId: payment.member.id,
      currency: payment.currency,
      note: payment.note,
      included: payment.included.map<string>(member => member.id)
    };
    return this.http.post<FullRoomData>(`${API}/room/${this.room.value.roomKey}/payment`, data).toPromise()
    .then(data => { this.setRoomDetails(data); });
  }

  public deletePayment(payment: Payment): Promise<any> {
    return this.http.delete<FullRoomData>(`${API}/room/${this.room.value.roomKey}/payment/${payment.id}`).toPromise()
    .then(data => { this.setRoomDetails(data); });
  }

  public revivePayment(payment: Payment): Promise<any> {
    return this.http.patch<FullRoomData>(`${API}/room/${this.room.value.roomKey}/payment/${payment.id}`, {}).toPromise()
    .then(data => { this.setRoomDetails(data); });
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
    return Promise.resolve();
    // return new Request(this.http).patch('/settings/rounding', { rounding, roomKey: this.room.value.roomKey })
    // .then(() => { this.room.next({...this.room.value, rounding}); this.loadRoomDetails(); });
  }

  public setMainCurrency(mainCurrency: string): Promise<any> {
    return Promise.resolve();
    // return new Request(this.http).patch('/settings/currency', { mainCurrency, roomKey: this.room.value.roomKey })
    // .then(() => { this.room.next({...this.room.value, mainCurrency}); this.loadRoomDetails(); });
  }

  public addNewMember(name: string, paymentsIncluded: Payment[]): Promise<any> {
    return Promise.resolve();
    // const member: UploadableMember = { roomKey: this.room.value.roomKey, payments: paymentsIncluded.map<string>(p => p.id), name };
    // return new Request(this.http).patch('/room/members', member)
    // .then(() => { this.loadRoomDetails(); });
  }

  public deleteMember(member: Member): Promise<any> {
    return Promise.resolve();
    // return new Request(this.http).delete(`/room/${ this.room.value.roomKey }/members/${ member.id }`)
    // .then(() => { this.loadRoomDetails(); });
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

  public deleteOldRooms(): Promise<any> {
    return Promise.resolve();
  }

  private round(value: number) {
    const { rounding } = this.room.value;
    return Math.floor(value / rounding) * rounding;
  }
}
