import { Pipe, PipeTransform } from '@angular/core';

interface Value {
  value: number;
  currency: string;
}

@Pipe({
  name: 'valuePipe'
})
export class ValuePipe implements PipeTransform {

  transform(value: Value): string {
    return this.addCurrency(this.splitNumber(value.value), value.currency);
  }

  splitNumber(n: number) {
    const seperatedDigits: string[] = [];
    const negative = n < 0;
    const hundredth = Math.round(n * 100 - Math.floor(n) * 100);

    n = Math.floor(n);
    if (negative) n = -1 * n;
    while (true) {
      const digits = n % 1000;
      n -= digits;
      n /= 1000;
      if (n > 0)
        seperatedDigits.unshift(this.addZeros(digits));
      else {
        seperatedDigits.unshift(digits + '');
        break;
      }
    }

    seperatedDigits[0] = (negative ? '-' : '') + seperatedDigits[0];
    return seperatedDigits.join(' ') + ((hundredth > 0) ? ('.' + hundredth) : '');

  }

  addZeros(n: number): string {
    if (n > 100) return n + '';
    if (n < 10) return '00' + n;
    if (n < 100) return '0' + n;
    return '000';
  }

  addCurrency(number: string, currency: string) {
    switch (currency) {
      case 'HUF':
        return number + ' Ft';
      case 'EUR':
        return '€ ' + number;
      case 'USD':
        return '$ ' + number;
      default:
        return number + ' ' + currency;
    }
  }

}
