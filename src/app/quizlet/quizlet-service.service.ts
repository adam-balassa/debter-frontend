import { Injectable } from '@angular/core';
import { QuizletSet } from './quizlet-sets/quizlet-sets.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizletCard } from './edit/edit.component';

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
    return this.http.post<any>('/quizlet', {userName}).toPromise().then(result => {
      this.data.next(result);
    });
  }

  createNewSet(title: string, cards: QuizletCard[]): Promise<any> {
    return this.http.post('/quizlet/new', {title, cards, userId: this.data.value.user.id}).toPromise().then(result => {
      this.login(this.data.value.user.name);
    });
  }

  editSet(set: QuizletSet): Promise<any>  {
    return this.http.patch('/quizlet', {setId: set.id, cards: set.cards}).toPromise().then(result => {
      this.login(this.data.value.user.name);
    });
  }
}
