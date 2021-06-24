import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  AddMemberRequest,
  AddPaymentRequest,
  CreateRoomResponse,
  GetDebtsResponse,
  GetPaymentsResponse,
  RoomSummary,
} from "../models/debter-interfaces.model";

const API = environment.API;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  roomKey: string;

  constructor(private http: HttpClient) {}

  public ping() {
    this.http.get(`${API}/actuator/health`);
  }

  public createRoom(name: string): Promise<CreateRoomResponse> {
    return this.http
      .post<CreateRoomResponse>(`${API}/room`, { name })
      .toPromise()
      .then((room) => {
        this.roomKey = room.roomKey;
        return room;
      });
  }

  public addMembers(members: string[]): Promise<void> {
    return this.http
      .post(`${API}/room/${this.roomKey}/members`, { members })
      .toPromise()
      .then();
  }

  public getRoomSummary(roomKey: string = null): Promise<RoomSummary> {
    roomKey = roomKey || this.roomKey;
    return this.http.get<RoomSummary>(`${API}/room/${roomKey}/summary`).toPromise();
  }

  public getRoomSettings(): Promise<{rounding: number, currency: string}> {
    return this.http.get<{rounding: number, currency: string}>(`${API}/room/${this.roomKey}/settings`).toPromise();
  }

  public updateRoomSettings(settings: {rounding: number, currency: string}): Promise<void> {
    return this.http.put(`${API}/room/${this.roomKey}/settings`, settings).toPromise().then();
  }

  public addMemberToExistingRoom(newMember: AddMemberRequest): Promise<void> {
    return this.http.put(`${API}/room/${this.roomKey}/members`, newMember).toPromise().then();
  }

  public deleteMember(memberId: string): Promise<void> {
    return this.http.delete(`${API}/room/${this.roomKey}/members/${memberId}`).toPromise().then();
  }

  public getMembers(): Promise<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(
      `${API}/room/${this.roomKey}/members`
    ).toPromise();
  }

  public getPayments(): Promise<GetPaymentsResponse> {
    return this.http.get<GetPaymentsResponse>(
      `${API}/room/${this.roomKey}/payments`
    ).toPromise().then(payments => {
      payments.activePayments.forEach(p => p.date = new Date(p.date))
      payments.deletedPayments.forEach(p => p.date = new Date(p.date))
      return payments;
    });
  }

  public getDebts(): Promise<GetDebtsResponse> {
    return this.http.get<GetDebtsResponse>(`${API}/room/${this.roomKey}/debts`).toPromise();
  }

  public uploadPayment(payment: AddPaymentRequest): Promise<any> {
    return this.http
      .post(`${API}/room/${this.roomKey}/payments`, payment)
      .toPromise()
      .then();
  }

  public deletePayment(paymentId: string): Promise<any> {
    return this.http
      .delete(`${API}/room/${this.roomKey}/payments/${paymentId}`)
      .toPromise()
      .then();
  }

  public revivePayment(paymentId: string): Promise<any> {
    return this.http
      .patch(`${API}/room/${this.roomKey}/payments/${paymentId}`, {})
      .toPromise()
      .then();
  }
}
