import { Injectable } from '@angular/core';
import { QuizletSet } from './quizlet-sets/quizlet-sets.component';
import { BehaviorSubject } from 'rxjs';
import { Request } from '../models/request.model';
import { HttpClient } from '@angular/common/http';
import { QuizletCard } from './edit/edit.component';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Injectable({
  providedIn: 'root'
})
export class QuizletServiceService {
  public data: BehaviorSubject<{
    user: { name: string; id: string },
    sets: QuizletSet[],
  }> = new BehaviorSubject({
    user: { name: '', id: '' }, sets: []
  });
  constructor(private http: HttpClient) { }

  login(userName: string): Promise<any> {
    return new Request(this.http).post('/quizlet', {userName}).then(result => {
      this.data.next(result);
    });
  }

  createNewSet(title: string, cards: QuizletCard[]): Promise<any> {
    return new Request(this.http).post('/quizlet/new', {title, cards, userId: this.data.value.user.id}).then(result => {
      this.login(this.data.value.user.name);
    });
  }

  editSet(set: QuizletSet): Promise<any>  {
    return new Request(this.http).patch('/quizlet', {setId: set.id, cards: set.cards}).then(result => {
      this.login(this.data.value.user.name);
    });
  }
}
