import { Injectable } from '@angular/core';

const debterCookieName = 'debter_pids';

interface Room {
    roomKey: string;
    name: string;
}
@Injectable({providedIn: 'root'})
export class CookieManager {

    rooms: Room[];

    constructor() {
        const debterCookies = this.getCookie(debterCookieName);
        try {
            this.rooms = JSON.parse(debterCookies);
        } catch (error) { this.rooms = []; }
    }

    loadRooms(): Room[] {
        return this.rooms;
    }

    addRoom(roomKey: string, name: string) {
        if (this.rooms.find(room => room.roomKey === roomKey))
            this.eraseRoom(roomKey);
        this.rooms.unshift({roomKey, name});
        this.saveProjectIds();
    }

    eraseRoom(roomKey: string) {
        if (this.rooms.findIndex(room => room.roomKey === roomKey) === -1) return;
        this.rooms.splice(this.rooms.findIndex(room => room.roomKey === roomKey), 1);
        this.saveProjectIds();
    }

    private saveProjectIds() {
        this.setCookie(debterCookieName, JSON.stringify(this.rooms), 10000);
    }

    private setCookie(name: string, value: string, days?: number) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    }

    private getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return '';
    }
}
