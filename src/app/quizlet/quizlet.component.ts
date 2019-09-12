import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { QuizletCard } from './edit/edit.component';
import { Subscription } from 'rxjs';
import { QuizletServiceService } from './quizlet-service.service';
import { ActivatedRoute } from '@angular/router';
const animationLength: number = 150;
interface Card {
  first: string;
  second: string;
  third: string;
  index: number;
}

@Component({
  selector: 'app-quizlet',
  templateUrl: './quizlet.component.html',
  styleUrls: ['./quizlet.component.css'],
  animations: [
    trigger('appear', [
      transition('void => *', [
        style({opacity: 0}),
        animate(300),
        style({ opacity: 1 })
      ])
    ]),
    trigger('turn', [
      state('back', style({
        transform: 'perspective(500px) rotateX(90deg)',
        zIndex: '0'
      })),
      state('front', style({
        transform: 'perspective(500px) rotateX(360deg)',
        zIndex: '3'
      })),
      transition('back => front', [
        style({ transform: 'perspective(500px) rotateX(270deg)' }),
        animate(`${animationLength}ms ${animationLength}ms`),
      ]),
      transition('front => back', [
        style({ transform: 'perspective(500px) rotateX(0)' }),
        animate(animationLength)
      ])
    ])
  ]
})
export class QuizletComponent implements OnInit, OnDestroy {
  title: string = '';
  cards: QuizletCard[] = [];
  subscription: Subscription;
  constructor(private quizlet: QuizletServiceService, private link: ActivatedRoute) { }

  side: boolean = true;
  currentIndex: number = 0;
  state: number = 0;
  stateString: string = 'first';

  shuffled: boolean = false;

  ngOnInit() {
    const setId = this.link.snapshot.params.setId;

    const set = this.quizlet.data.value.sets.find(s => s.id === setId);
    this.title = set.name;
    this.cards = set.cards;

    this.subscription = this.quizlet.data.subscribe(data => {
      const set2 = data.sets.find(s => s.id === setId);
      this.title = set2.name;
      this.cards = set2.cards;
    });
  }

  turn() {
    this.state = ++this.state % 3;
    this.side = !this.side;
    setTimeout(() => { this.stateString = this.state === 0 ? 'first' : this.state === 1 ? 'second' : 'third'; }, animationLength);
  }

  back() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.state = 0;
    this.stateString = 'first';
  }

  forward() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.cards.length - 1);
    this.state = 0;
    this.stateString = 'first';
  }

  shuffle() {
    if (this.shuffled) this.cards.sort((a, b) => a.index - b.index);
    else this.reshuffleCards();
    this.currentIndex = 0;
    this.shuffled = !this.shuffled;
    this.state = 0;
    this.stateString = 'first';
  }

  reshuffleCards() {

    let currentIndex = this.cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
