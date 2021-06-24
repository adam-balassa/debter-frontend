import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
  settings: {rounding: number, currency: string}

  constructor(private api: ApiService, private addUserService: AddUserService, private router: Router, private link: ActivatedRoute) { }

  async ngOnInit() {
    this.settings = await this.api.getRoomSettings();
    this.initialValueIndex = this.values.indexOf(this.settings.rounding);
    this.initialCurrencyIndex = this.currencies.indexOf(this.settings.currency);
  }

  async setCurrency(newCurrency: string) {
    this.loading = true;
    this.settings.currency = newCurrency;
    await this.api.updateRoomSettings(this.settings);
    this.loading = false;
  }

  async setRounding(rounding: number) {
    this.loading = true;
    this.settings.rounding = rounding;
    await this.api.updateRoomSettings(this.settings);
    this.loading = false;
  }

  addNewMember(name: string) {
    this.addUserService.name = name;
    this.router.navigate(['new-member'], { relativeTo: this.link });
  }

}
