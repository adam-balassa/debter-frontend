import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddPaymentRequest, CreateRoomResponse, GetDebtsResponse, RoomSummary } from '../models/debter-interfaces.model';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    roomKey: string;

    constructor(private http: HttpClient) { }

    public createRoom(name: string): Promise<CreateRoomResponse> {
        return this.http.post<CreateRoomResponse>(`${API}/room`, { name }).toPromise().then(room => {
            this.roomKey = room.roomKey;
            return room;
        });
    }

    public addMembers(members: string[]): Promise<void> {
        return this.http.post(`${API}/room/${this.roomKey}/members`, {members}).toPromise().then();
    }

    public getRoomSummary(): Observable<RoomSummary> {
        return this.http.get<RoomSummary>(`${API}/room/${this.roomKey}/summary`);
    }

    public getMembers(): Observable<{id: string, name: string}[]> {
        return this.http.get<{id: string, name: string}[]>(`${API}/room/${this.roomKey}/members`);
    }

    public getDebts(): Observable<GetDebtsResponse> {
        return this.http.get<GetDebtsResponse>(`${API}/room/${this.roomKey}/debts`);
    }

    public uploadPayment(payment: AddPaymentRequest): Promise<any> {
        return this.http.post(`${API}/room/${this.roomKey}/payments`, payment).toPromise().then();
    }

    public deletePayment(paymentId: string): Promise<any> {
        return this.http.delete(`${API}/room/${this.roomKey}/payments/${paymentId}`).toPromise().then();
    }

    public revivePayment(paymentId: string): Promise<any> {
        return this.http.patch(`${API}/room/${this.roomKey}/payments/${paymentId}`, {}).toPromise().then();
    }
}
