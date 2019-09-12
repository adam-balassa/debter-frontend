import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { QuizletServiceService } from '../quizlet-service.service';
import { Router } from '@angular/router';

interface Card {
  first: string;
  second: string;
  third: string;
  index: number;
}

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css'],
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
export class CreateSetComponent implements OnInit {
  title: string = '';
  cards: Card[] = [
    {first: '', second: '', third: '', index: 1},
    {first: '', second: '', third: '', index: 2},
    {first: '', second: '', third: '', index: 3},
  ];
  constructor(private quizlet: QuizletServiceService, private router: Router) { }

  ngOnInit() {
  }

  change(cardChanged: Card, term: number) {
    if (this.cards.every(card => card.first !== '' && card.second !== '' && card.third !== ''))
      this.cards.push({first: '', second: '', third: '', index: this.cards.length + 1});
  }

  delete(card: Card) {
    const index = this.cards.findIndex(c => c === card);
    this.cards.splice(index, 1);
    for (let i = index; i < this.cards.length; ++i) this.cards[i].index--;
  }

  save() {
    this.quizlet.createNewSet(this.title, this.cards.filter(card => card.first.length > 0))
    .then(() => this.router.navigateByUrl('/quizlet/sets'));
  }

}
