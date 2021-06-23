import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/debter.model';
import { AddUserService } from '../../services/add-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  readonly values: number[] = [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000];
  readonly currencies: string[] = ['HUF', 'EUR', 'USD'];
  initialValueIndex: number;
  initialCurrencyIndex: number;
  loading = false;

  constructor(private addUserService: AddUserService, private router: Router, private link: ActivatedRoute) { }

  ngOnInit() {
    // const room: Room = this.room.room.value;
    // this.initialValueIndex = this.values.indexOf(room.rounding);
    // this.initialCurrencyIndex = this.currencies.indexOf(room.mainCurrency);
  }

  setCurrency(newCurrency: string) {
    this.loading = true;
    // this.room.setMainCurrency(newCurrency)
    // .then(() => { this.loading = false; });
  }

  setRounding(rounding: number) {
    this.loading = true;
    // this.room.setRounding(rounding)
    // .then(() => { this.loading = false; });
  }

  addNewMember(name: string) {
    this.addUserService.name = name;
    this.router.navigate(['new-member'], { relativeTo: this.link });
  }

}
