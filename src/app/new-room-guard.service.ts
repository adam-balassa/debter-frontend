import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoomService } from './services/room.service';

@Injectable({
  providedIn: 'root'
})
export class NewRoomGuardService implements CanActivate {

  constructor(private room: RoomService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    return new Promise(resolve => {
      if (this.room.room.value.roomKey === route.params.roomKey && this.room.room.value.members.length === 0) return resolve(true);
      this.router.navigateByUrl('/');
      resolve(false);
    });
  }
}
