import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'licensePlateFormat',
  standalone: true
})
export class LicensePlateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 7) {
      return value;
    }


    const formattedValue = `${value.substr(0, 3)}-${value.substr(3)}`;

    return formattedValue;
  }
}
