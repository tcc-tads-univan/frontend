import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { utcToZonedTime, format } from 'date-fns-tz';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, formatString: string = 'dd-MM-yyyy HH:mm:ss', timezone: string = 'America/Sao_Paulo'): string {
    const brasiliaTime = utcToZonedTime(value, timezone);

    const formattedDate = format(brasiliaTime, formatString, { timeZone: timezone });

    return this.addCustomString(formattedDate);
  }

  private addCustomString(dateString: string): string {
    // Add your custom string between the date and time
    const customString = ' às ';

    // Split the date and time parts
    const [datePart, timePart] = dateString.split(' ');

    // Return the formatted date with the custom string
    return `${datePart}${customString}${timePart}`;
  }
}
