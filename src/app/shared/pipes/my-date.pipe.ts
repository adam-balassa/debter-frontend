import { Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import { DatePipe } from "@angular/common";
import { LanguageService } from '../language.service';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

  datePipe: DatePipe;

  constructor(private languageService: LanguageService){
    this.datePipe = new DatePipe(languageService.language)
  }

  transform(date: Date, args?: any): any {
    const now = new Date().getTime();
    const lengthOfADay = 24 * 60 * 60 * 1000
    const time = date.getTime()

    if(time > now - lengthOfADay)
      return this.today(date)

    if(time < now - lengthOfADay * 365)
      return this.old(date)

    if(time > now - lengthOfADay * 7)
      return this.pastWeek(date);

    return this.thisYear(date)
    
  }

  thisYear(date: Date): string{
    return this.datePipe.transform(date, 'MMM d. H:mm')
  }

  pastWeek(date: Date): string{
    return this.datePipe.transform(date, 'E, H:mm')
  }

  today(date: Date): string{
    return 'Today, ' + this.datePipe.transform(date, 'H:mm:ss')
  }

  old(date: Date): string{
    return this.datePipe.transform(date, 'y MMM d.')
  }

}
