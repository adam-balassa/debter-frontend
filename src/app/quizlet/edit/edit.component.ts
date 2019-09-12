import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizletServiceService } from '../quizlet-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizletSet } from '../quizlet-sets/quizlet-sets.component';
import { trigger, transition, style, animate } from '@angular/animations';

export interface QuizletCard {
  first: string;
  second: string;
  third: string;
  index: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations: [
    trigger('appear', [
      transition('void => *', [
        style({opacity: 0}),
        animate(300),
        style({ opacity: 1 })
      ])
    ])
  ]
})
export class EditComponent implements OnInit, OnDestroy {
  set: QuizletSet;
  subscription: Subscription;
  constructor(private quizlet: QuizletServiceService, private link: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const setId = this.link.snapshot.params.setId;
    this.set = this.quizlet.data.value.sets.find(s => s.id === setId);
    this.change();
    this.subscription = this.quizlet.data.subscribe(data => {
      this.set = data.sets.find(s => s.id === setId);
    });
  }

  change() {
    if (this.set.cards.every(card => card.first !== '' && card.second !== '' && card.third !== ''))
      this.set.cards.push({first: '', second: '', third: '', index: this.set.cards.length + 1});
  }

  delete(card: QuizletCard) {
    const index = this.set.cards.findIndex(c => c === card);
    this.set.cards.splice(index, 1);
    for (let i = index; i < this.set.cards.length; ++i) this.set.cards[i].index--;
  }

  save() {
    this.quizlet.editSet({...this.set, cards: this.set.cards.splice(0, this.set.cards.length - 1)})
    .then(() => this.router.navigateByUrl('/quizlet/sets'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
