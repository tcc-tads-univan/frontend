import { Pipe, PipeTransform } from '@angular/core';
import { utcToZonedTime, format } from 'date-fns-tz';

@Pipe({
  name: 'dateFormatWs',
  standalone: true
})
export class DateFormatPipeWsPipe implements PipeTransform {

  transform(value: string | Date, formatString: string = 'dd/MM/yyyy', timezone: string = 'America/Sao_Paulo'): string {
    const brasiliaTime = utcToZonedTime(value, timezone);

    const formattedDate = format(brasiliaTime, formatString, { timeZone: timezone });

    return formattedDate;
  }

}
