import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizletCard } from '../edit/edit.component';
import { Subscription } from 'rxjs';
import { QuizletServiceService } from '../quizlet-service.service';
import { Router } from '@angular/router';
export interface QuizletSet {
  name: string;
  id: string;
  cards: QuizletCard[];
}
@Component({
  selector: 'app-quizlet-sets',
  templateUrl: './quizlet-sets.component.html',
  styleUrls: ['./quizlet-sets.component.css']
})
export class QuizletSetsComponent implements OnInit, OnDestroy {
  sets: QuizletSet[] = [];
  subscription: Subscription;
  constructor(private quizlet: QuizletServiceService, private router: Router) { }

  ngOnInit() {
    this.sets = this.quizlet.data.value.sets;
    this.subscription = this.quizlet.data.subscribe(data => {
      this.sets = data.sets;
      if (this.sets.length === 0)
        this.router.navigateByUrl('/quizlet/create');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
