import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 10) {
      return value;
    }

    value = value.replace(/\D/g, '');

    let formattedValue = `(${value.substr(0, 2)}) ${value.substr(2, 5)}-${value.substr(7)}`;


    return formattedValue.trim();
  }
}
