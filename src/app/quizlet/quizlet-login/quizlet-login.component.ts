import { Component, OnInit } from '@angular/core';
import { QuizletServiceService } from '../quizlet-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizlet-login',
  templateUrl: './quizlet-login.component.html',
  styleUrls: ['./quizlet-login.component.css']
})
export class QuizletLoginComponent implements OnInit {

  constructor(private quizlet: QuizletServiceService, private router: Router) { }

  ngOnInit() {
  }

  login(userName: string) {
    this.quizlet.login(userName).then(() => { this.router.navigateByUrl('/quizlet/sets'); });
  }
}
