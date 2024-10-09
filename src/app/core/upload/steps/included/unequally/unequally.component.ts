import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Split } from 'src/app/models/debter-interfaces.model';

interface Member {
  id: string;
  name: string;
}

interface MemberSplit {
  member: Member;
  split: Split;
}

@Component({
  selector: 'app-unequally',
  templateUrl: './unequally.component.html',
  styleUrls: ['./unequally.component.css']
})
export class UnequallyComponent implements OnInit {
  @Input() members: Member[];
  @Input() set split(value: Split[]) {
    this.memberSplit = this.members.map(m => ({
      member: m, split: value.find(s => s.memberId === m.id) || { memberId: m.id, units: 0 }
    }));
    this.recalculateSplit();
  }

  @Input() total: number;
  @Input() currency: string;
  @Input() isValid: boolean = true;
  @Output() splitChange = new EventEmitter<Split[]>();
  @Output() isValidChange = new EventEmitter<boolean>();

  memberSplit: MemberSplit[];

  unit: 'percentage' | 'exact' | 'ratio' = 'percentage';

  get validationIssue() {
    const totalUnits = this.memberSplit.reduce((acc, s) => acc + s.split.units, 0);
    if (this.unit === 'percentage' && totalUnits !== 100) {
      return `Total percentage must be 100%
      Current total is ${totalUnits}%`;
    } else if (this.unit === 'exact' && totalUnits !== this.total) {
      return `Total must be ${this.total} ${this.currency}
      Current total is ${totalUnits} ${this.currency}`;
    }
    return null;
  }

  constructor() { }

  ngOnInit() {
    this.onUnitChange('percentage');
  }

  recalculateSplit() {
    const totalUnits = this.memberSplit.reduce((acc, s) => acc + s.split.units, 0);

    if (this.unit === 'percentage') {
      this.memberSplit.forEach(s => s.split.units = this.round(s.split.units / totalUnits * 100));
    } else if (this.unit === 'exact') {
      this.memberSplit.forEach(s => s.split.units = this.round(s.split.units / totalUnits * this.total));
    } else if (this.unit === 'ratio') {
      const splitGcd = findLargestCommonDenominator(this.memberSplit.map(s => Math.round(s.split.units)));
      this.memberSplit.forEach(s => s.split.units = Math.round(s.split.units) / splitGcd);
    }
  }

  onUnitChange(unit: 'percentage' | 'exact' | 'ratio') {
    this.unit = unit;
    this.recalculateSplit();
    this.onSplitChange();
  }

  private round(n: number) {
    return Math.round(n * 10) / 10;
  }

  onSplitChange() {
    if (this.validationIssue) this.isValidChange.emit(false);
    else {
      this.splitChange.emit(this.memberSplit.map(s => s.split));
      this.isValidChange.emit(true);
    }
  }

  displayCurrency() {
    switch (this.currency) {
      case 'HUF':
        return 'Ft';
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      default:
        return this.currency;
    }
  }
}

function gcd(a: number, b: number): number {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}

function findLargestCommonDenominator(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, val) => gcd(acc, val));
}
