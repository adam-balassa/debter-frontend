import { Injectable } from '@angular/core';

const debterCookieName = 'debter_pids';
const separator = '|';

@Injectable({providedIn: 'root'})
export class CookieManager {

    projectIds: string[];

    constructor() {
        const oldIds = this.loadOldCookies();
        const debterCookies = this.getCookie(debterCookieName);
        const ids = debterCookies === '' ? [] : debterCookies.split(separator);
        this.projectIds = Array.from(new Set<string>([...ids, ...oldIds]));
        this.saveProjectIds();
    }

    loadProjectIds(): string[] {
        return Array.from(this.projectIds);
    }

    fetchProjectId(newId: string) {
        if (this.projectIds.indexOf(newId) !== -1)
            this.eraseProjectId(newId);
        this.projectIds.unshift(newId);
        this.saveProjectIds();
    }

    eraseProjectId(id: string) {
        if (this.projectIds.indexOf(id) === -1) return;
        this.projectIds.splice(this.projectIds.indexOf(id), 1);
        this.saveProjectIds();
    }

    private loadOldCookies(): string[] {
        const oldDebterCookieName = 'debter_projects';
        const oldSeparator = '&';
        const oldDebterCookies = this.getCookie(oldDebterCookieName);
        const ids = oldDebterCookies === '' ? [] : oldDebterCookies.split(oldSeparator);
        this.setCookie(oldDebterCookieName, '');
        return ids.filter(id => id.length === 6);
    }

    private saveProjectIds() {
        this.setCookie(debterCookieName, Array.from(this.projectIds).join('|'), 10000);
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
