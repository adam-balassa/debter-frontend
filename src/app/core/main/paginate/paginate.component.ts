import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Page {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  @Input() pages: Page[] = [];
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pages = [
      {title: 'Browse previous payments', icon: 'history', url: 'history/all'},
      {title: 'Upload new payment', icon: 'upload', url: 'upload'},
      {title: 'Check out debt arrangement', icon: 'credit-card', url: 'debts'}
    ];
  }

  redirect(url: string): void {
    this.router.navigate([ url ], {relativeTo: this.route});
  }

}
