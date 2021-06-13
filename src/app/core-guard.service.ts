import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoomService } from './services/room.service';

@Injectable({
  providedIn: 'root'
})
export class CoreGuardService implements CanActivate {

  constructor(private room: RoomService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    return new Promise(resolve => {
      if (this.room.room.value.roomKey === route.params.roomKey) return resolve(true);
      this.room.room.next({ ...this.room.room.value, roomKey: route.params.roomKey })
      resolve(true);
    });
  }
}
