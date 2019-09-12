import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { QuizletServiceService } from './quizlet-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizletGuardService implements CanActivate {

  constructor(private quizlet: QuizletServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    return new Promise(resolve => {
      if (this.quizlet.data.value.user.id === '') {
        this.router.navigateByUrl('/quizlet');
        resolve(false);
      }
      resolve(true);
    });
  }
}
