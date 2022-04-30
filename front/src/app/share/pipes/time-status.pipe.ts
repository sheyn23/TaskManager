import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStatus'
})
export class TimeStatusPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(date: Date): unknown {
    date = new Date(date)

    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let hour: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    let diffMs = +new Date() - +new Date(date);
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = Math.round(diffSec / 60);
    let diffHour = Math.round(diffMin / 60);
    let diffDay = Math.round(diffHour / 24);

    year = year.toString().slice(-2);
    month = month < 10 ? '0' + month : month;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (diffSec < 1) {
      return 'только что';
    } else if (diffMin < 1) {
      return `${diffSec} сек. назад`
    } else if (diffHour < 1) {
      return `${diffMin} мин. назад`
    } else if (diffDay < 1) {
      return `${diffHour} часа назад`
    } else {
      return this.datePipe.transform(date, 'dd MMMM yyyy, HH:mm');
    }
  }

}
