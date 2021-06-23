import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CoreGuardService implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    return new Promise(resolve => {
      if (this.api.roomKey === route.params.roomKey) return resolve(true);
      this.api.roomKey = route.params.roomKey;
      resolve(true);
    });
  }
}
